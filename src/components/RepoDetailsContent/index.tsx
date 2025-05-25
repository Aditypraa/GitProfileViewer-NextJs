'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGitHub } from '@/context/GitHubContext';
import styles from './RepoDetailsContent.module.css';
import UserProfile from '../UserProfile';
import ReadmeViewer from '../ReadmeViewer';
import { getLanguageColor } from '@/utils/languageColor';

export default function RepoDetailsContent() {
  const params = useParams();
  const username = params.username as string;
  const repoSlug = params.repo as string;
  const { loadUserAndSelectRepo, loading, error, user, selectedRepo } =
    useGitHub();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive layout detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (username && repoSlug) {
      // Use the new combined function instead of separate calls
      loadUserAndSelectRepo(username, repoSlug);
    }
  }, [username, repoSlug, loadUserAndSelectRepo]);

  if (error) {
    return (
      <section className={styles.error} role="alert">
        <p>{error}</p>
        <button onClick={() => router.back()} className={styles.backButton}>
          Go Back
        </button>
      </section>
    );
  }

  if (loading) {
    return (
      <section className={styles.loading} aria-live="polite">
        Loading repository details...
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonSidebar}>
            <div className={styles.skeletonProfile}></div>
            <div className={styles.skeletonRepoInfo}></div>
          </div>
          <div className={styles.skeletonReadme}></div>
        </div>
      </section>
    );
  }

  // Check if we have the necessary data
  if (!user || !selectedRepo) {
    return (
      <section className={styles.loading} aria-live="polite">
        Loading repository data...
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonSidebar}>
            <div className={styles.skeletonProfile}></div>
            <div className={styles.skeletonRepoInfo}></div>
          </div>
          <div className={styles.skeletonReadme}></div>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <UserProfile compact />
        <section className={styles.repoInfo}>
          <h3 className={styles.repoTitle}>
            {isMobile ? selectedRepo.name : selectedRepo.full_name}
          </h3>
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
                  aria-hidden="true"
                ></span>
                {selectedRepo.language}
              </span>
            )}
            {selectedRepo.stargazers_count > 0 && (
              <span className={styles.stars} title="Stars">
                ⭐ {selectedRepo.stargazers_count}
              </span>
            )}
            {selectedRepo.forks_count > 0 && (
              <span className={styles.forks} title="Forks">
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
        </section>
      </aside>

      <main className={styles.main}>
        <ReadmeViewer />
      </main>
    </div>
  );
}
