'use client';

import { useGitHub } from '@/context/GitHubContext';
import styles from './ReadmeViewer.module.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import rehypeRaw from 'rehype-raw';

// Dynamically import ReactMarkdown to avoid SSR issues
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>Loading markdown renderer...</div>
  ),
});

export default function ReadmeViewer() {
  const { selectedRepo, readme, loading } = useGitHub();
  const [markdownContent, setMarkdownContent] = useState('');

  // Update markdown content when readme changes
  useEffect(() => {
    if (readme) {
      setMarkdownContent(readme);
    } else {
      setMarkdownContent('');
    }
  }, [readme]);

  if (!selectedRepo) {
    return (
      <article className={styles.placeholder}>
        <div className={styles.placeholderContent}>
          <h3>No repository selected</h3>
          <p>Select a repository to view its README</p>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <a
            href={selectedRepo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${selectedRepo.full_name} on GitHub`}
          >
            {selectedRepo.full_name}
          </a>
        </h2>
      </header>

      <section className={styles.content}>
        {loading ? (
          <div className={styles.loading} aria-live="polite">
            <div className={styles.loadingContainer}>Loading README...</div>
            <div className={`${styles.skeletonLine} ${styles.line1}`}></div>
            <div className={`${styles.skeletonLine} ${styles.line2}`}></div>
            <div className={`${styles.skeletonLine} ${styles.line3}`}></div>
          </div>
        ) : markdownContent ? (
          <div className={styles.markdown}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        ) : (
          <p className={styles.noReadme}>
            No README found for this repository.
          </p>
        )}
      </section>
    </article>
  );
}
