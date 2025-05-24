/**
 * Shared API utilities for GitHub API integration
 */
import axios, { AxiosRequestConfig } from 'axios';

/**
 * GitHub API base URL with fallback
 */
export const API_URL = process.env.GITHUB_API_URL || 'https://api.github.com';

/**
 * Get headers for GitHub API requests including authorization if token is available
 */
export const getHeaders = () => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

/**
 * Create a full API URL for GitHub endpoints
 */
export const createApiUrl = (endpoint: string): string => {
  return `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

/**
 * Unified GitHub API client function
 */
export async function githubApiClient<T>(
  endpoint: string,
  options: AxiosRequestConfig = {},
): Promise<T> {
  const url = createApiUrl(endpoint);
  const config: AxiosRequestConfig = {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  };

  const response = await axios<T>(url, config);
  return response.data;
}
