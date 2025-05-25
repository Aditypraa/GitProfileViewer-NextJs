'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGitHub } from '@/context/GitHubContext';
import styles from './UserProfileContent.module.css';
import UserProfile from '../UserProfile';
import RepoList from '../RepoList';

export default function UserProfileContent() {
  const params = useParams();
  const username = typeof params.username === 'string' ? params.username : '';
  const { searchUser, loading, error } = useGitHub();

  useEffect(() => {
    if (username) {
      searchUser(username);
    }
  }, [username, searchUser]);

  if (error) {
    return (
      <section className={styles.error} role="alert">
        <p>{error}</p>
        <button
          onClick={() => (window.location.href = '/')}
          className={styles.backButton}
        >
          Back to Home
        </button>
      </section>
    );
  }

  if (loading) {
    return (
      <section className={styles.loading} aria-live="polite">
        Loading user profile...
        <div className={styles.skeletonContainer}>
          <div
            className={`${styles.skeletonLoader} ${styles.profileSkeleton}`}
          ></div>
          <div
            className={`${styles.skeletonLoader} ${styles.repoSkeleton}`}
          ></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <UserProfile />
      <RepoList />
    </>
  );
}
