'use client';

import { useRouter } from 'next/navigation';
import { GitHubProvider } from '@/context/GitHubContext';
import UserProfileContent from '@/components/UserProfileContent';
import styles from '../page.module.css';

function UserProfilePage() {
  return (
    <div className={styles.content}>
      <div className={styles.userSection}>
        <UserProfileContent />
      </div>
    </div>
  );
}

export default function UserProfileWrapper() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button onClick={handleBackToHome} className={styles.backButton}>
            ← Home
          </button>
          <h1 className={styles.title}>GitHub Profile Viewer</h1>
        </div>
      </header>

      <GitHubProvider>
        <main className={styles.main}>
          <UserProfilePage />
        </main>
      </GitHubProvider>

      <footer className={styles.footer}>
        <p>Built with Next.js and GitHub API</p>
      </footer>
    </div>
  );
}
