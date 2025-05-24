'use client';

import { useState } from 'react';
import { useGitHub } from '@/context/GitHubContext';
import styles from './SearchForm.module.css';

export default function SearchForm() {
  const [username, setUsername] = useState('');
  const { searchUser, loading } = useGitHub();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchUser(username);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className={styles.input}
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={loading || !username.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
