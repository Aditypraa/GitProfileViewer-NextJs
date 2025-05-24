'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGitHub } from '@/context/GitHubContext';
import styles from './RepoDetailsContent.module.css';
import UserProfile from '../UserProfile';
import ReadmeViewer from '../ReadmeViewer';

export default function RepoDetailsContent() {
  const params = useParams();
  const username = params.username as string;
  const repoSlug = params.repo as string;
  const { loadUserAndSelectRepo, loading, error, user, selectedRepo } =
    useGitHub();
  const router = useRouter();

  useEffect(() => {
    if (username && repoSlug) {
      // Use the new combined function instead of separate calls
      loadUserAndSelectRepo(
        decodeURIComponent(username),
        decodeURIComponent(repoSlug),
      );
    }
  }, [username, repoSlug, loadUserAndSelectRepo]);

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={() => router.back()} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className={styles.loading}>Loading repository details...</div>;
  }

  // Check if we have the necessary data
  if (!user || !selectedRepo) {
    return <div className={styles.loading}>Loading repository data...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <UserProfile compact />
        <div className={styles.repoInfo}>
          <h3 className={styles.repoTitle}>{selectedRepo.name}</h3>
          {selectedRepo.description && (
            <p className={styles.repoDescription}>{selectedRepo.description}</p>
          )}
          <div className={styles.repoStats}>
            {selectedRepo.language && (
              <span className={styles.language}>
                <span
                  className={styles.languageDot}
                  style={{
                    backgroundColor: getLanguageColor(selectedRepo.language),
                  }}
                ></span>
                {selectedRepo.language}
              </span>
            )}
            {selectedRepo.stargazers_count > 0 && (
              <span className={styles.stars}>
                ⭐ {selectedRepo.stargazers_count}
              </span>
            )}
            {selectedRepo.forks_count > 0 && (
              <span className={styles.forks}>
                🍴 {selectedRepo.forks_count}
              </span>
            )}
          </div>
          <a
            href={selectedRepo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoLink}
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className={styles.main}>
        <ReadmeViewer />
      </div>
    </div>
  );
}

// Helper function for language color
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Go: '#00ADD8',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Rust: '#dea584',
  };

  return colors[language] || '#8f8f8f';
}
