import axios from 'axios';
import { GitHubUser, GitHubRepo } from '@/types/github';

/**
 * Fetch GitHub user data through our API route
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const response = await axios.get(`/api/github/user?username=${username}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error || `Failed to fetch user: ${error.message}`,
      );
    }
    throw new Error('Failed to fetch user data');
  }
}

/**
 * Fetch user repositories through our API route
 */
export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await axios.get(`/api/github/repos?username=${username}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error ||
          `Failed to fetch repositories: ${error.message}`,
      );
    }
    throw new Error('Failed to fetch repositories');
  }
}

/**
 * Fetch repository README content through our API route
 */
export async function fetchRepoReadme(
  owner: string,
  repo: string,
): Promise<string> {
  try {
    const response = await axios.get(
      `/api/github/readme?owner=${owner}&repo=${repo}`,
    );
    return response.data.content;
  } catch (error) {
    console.error('Error fetching README:', error);
    return 'Failed to load README content.';
  }
}
