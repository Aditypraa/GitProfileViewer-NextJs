'use client';

import { useParams, useRouter } from 'next/navigation';
import { GitHubProvider } from '@/context/GitHubContext';
import RepoDetailsContent from '@/components/RepoDetailsContent';
import styles from '../../page.module.css';

function RepoDetailsPage() {
  return (
    <div className={styles.content}>
      <RepoDetailsContent />
    </div>
  );
}

export default function RepoDetailsWrapper() {
  const { username } = useParams();
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleBackToUser = () => {
    if (username) {
      router.push(`/${username}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumbs}>
            <button onClick={handleBackToHome} className={styles.backButton}>
              Home
            </button>
            <span className={styles.breadcrumbSeparator}>/</span>
            <button onClick={handleBackToUser} className={styles.backButton}>
              {username}
            </button>
          </div>
          <h1 className={styles.title}>Repository Details</h1>
        </div>
      </header>

      <GitHubProvider>
        <main className={styles.main}>
          <RepoDetailsPage />
        </main>
      </GitHubProvider>

      <footer className={styles.footer}>
        <p>Built with Next.js and GitHub API</p>
      </footer>
    </div>
  );
}
