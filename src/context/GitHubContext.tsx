'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { GitHubUser, GitHubRepo } from '@/types/github';
import {
  fetchGitHubUser,
  fetchUserRepos,
  fetchRepoReadme,
} from '@/services/githubService';

interface GitHubContextType {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  selectedRepo: GitHubRepo | null;
  readme: string;
  loading: boolean;
  error: string | null;
  searchUser: (username: string) => Promise<void>;
  selectRepo: (repo: GitHubRepo) => Promise<void>;
  selectRepoBySlug: (slug: string) => Promise<void>;
  loadUserAndSelectRepo: (username: string, repoSlug: string) => Promise<void>;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

export function GitHubProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [readme, setReadme] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = useCallback(async (username: string) => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      // Now using our service that calls our API routes
      const userData = await fetchGitHubUser(username);
      setUser(userData);

      const reposData = await fetchUserRepos(username);
      setRepos(reposData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
      setRepos([]);
      throw err; // Rethrow for error handling
    } finally {
      setLoading(false);
    }
  }, []);

  const selectRepo = useCallback(
    async (repo: GitHubRepo) => {
      setSelectedRepo(repo);
      setLoading(true);

      try {
        if (user) {
          // Now using our service that calls our API route
          const readmeContent = await fetchRepoReadme(user.login, repo.name);
          setReadme(readmeContent);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load README');
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const selectRepoBySlug = useCallback(
    async (slug: string) => {
      if (!slug) return;

      // If repos are empty, we can't select anything yet
      if (repos.length === 0) {
        return;
      }

      const repo = repos.find((r) => r.slug === slug);
      if (repo) {
        await selectRepo(repo);
      } else {
        setError(`Repository "${slug}" not found`);
      }
    },
    [repos, selectRepo],
  );

  // New function to handle the complete flow for repo details page
  const loadUserAndSelectRepo = useCallback(
    async (username: string, repoSlug: string) => {
      if (!username || !repoSlug) return;

      setLoading(true);
      setError(null);

      try {
        // First load user data
        const userData = await fetchGitHubUser(username);
        setUser(userData);

        // Then load repos
        const reposData = await fetchUserRepos(username);
        setRepos(reposData);

        // After repos are loaded, find and select the repo by slug
        const repo = reposData.find((r) => r.slug === repoSlug);
        if (repo) {
          // Then load the readme
          const readmeContent = await fetchRepoReadme(username, repo.name);

          // Finally update all states
          setSelectedRepo(repo);
          setReadme(readmeContent);
        } else {
          setError(`Repository "${repoSlug}" not found for user "${username}"`);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load repository details',
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <GitHubContext.Provider
      value={{
        user,
        repos,
        selectedRepo,
        readme,
        loading,
        error,
        searchUser,
        selectRepo,
        selectRepoBySlug,
        loadUserAndSelectRepo,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);
  if (context === undefined) {
    throw new Error('useGitHub must be used within a GitHubProvider');
  }
  return context;
}
