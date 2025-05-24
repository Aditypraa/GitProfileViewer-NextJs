'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGitHub } from '@/context/GitHubContext';
import styles from './UserProfileContent.module.css';
import UserProfile from '../UserProfile';
import RepoList from '../RepoList';

export default function UserProfileContent() {
  const params = useParams();
  const username = params.username as string;
  const { searchUser, loading, error } = useGitHub();

  useEffect(() => {
    if (username) {
      searchUser(decodeURIComponent(username));
    }
  }, [username, searchUser]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading user profile...</div>;
  }

  return (
    <>
      <UserProfile />
      <RepoList />
    </>
  );
}
