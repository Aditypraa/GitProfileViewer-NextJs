'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      router.push(`/${encodeURIComponent(username.trim())}`);
    }
  };

  // Featured GitHub users for easy access
  const featuredUsers = [
    'microsoft',
    'google',
    'facebook',
    'vercel',
    'nextjs',
    'nodejs',
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>GitHub Profile Viewer</h1>
        <p className={styles.description}>
          Search for GitHub users and explore their repositories
        </p>
      </header>

      <main className={styles.main}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
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

        <div className={styles.featuredUsers}>
          <h2>Popular GitHub Users</h2>
          <div className={styles.userGrid}>
            {featuredUsers.map((user) => (
              <button
                key={user}
                className={styles.userButton}
                onClick={() => router.push(`/${user}`)}
              >
                {user}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Built with Next.js and GitHub API</p>
      </footer>
    </div>
  );
}
