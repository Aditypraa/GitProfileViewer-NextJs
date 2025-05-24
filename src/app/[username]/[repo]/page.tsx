'use client';

import { useParams } from 'next/navigation';
import { GitHubProvider } from '@/context/GitHubContext';
import RepoDetailsContent from '@/components/RepoDetailsContent';
import styles from '../../page.module.css';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

export default function RepoDetailsWrapper() {
  const params = useParams();
  const username = typeof params.username === 'string' ? params.username : '';
  const repo = typeof params.repo === 'string' ? params.repo : '';

  // Define breadcrumb items for this page
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: username, href: `/${username}` },
    { label: repo },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Breadcrumb items={breadcrumbItems} />
          <h1 className={styles.title}>Repository Details</h1>
        </div>
      </header>

      <GitHubProvider>
        <main className={styles.main}>
          <div className={styles.content}>
            <RepoDetailsContent />
          </div>
        </main>
      </GitHubProvider>

      <Footer />
    </div>
  );
}
