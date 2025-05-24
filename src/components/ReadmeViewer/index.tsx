'use client';

import { useGitHub } from '@/context/GitHubContext';
import styles from './ReadmeViewer.module.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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
      <div className={styles.placeholder}>
        <div className={styles.placeholderContent}>
          <h3>No repository selected</h3>
          <p>Select a repository to view its README</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <a
            href={selectedRepo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedRepo.full_name}
          </a>
        </h2>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Loading README...</div>
        ) : markdownContent ? (
          <div className={styles.markdown}>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        ) : (
          <div className={styles.noReadme}>
            No README found for this repository.
          </div>
        )}
      </div>
    </div>
  );
}
