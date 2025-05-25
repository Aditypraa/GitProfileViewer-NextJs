'use client';

import { useParams } from 'next/navigation';
import { GitHubProvider } from '@/context/GitHubContext';
import UserProfileContent from '@/components/UserProfileContent';
import styles from '../page.module.css';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

export default function UserProfileWrapper() {
  const params = useParams();
  const username = typeof params.username === 'string' ? params.username : '';

  // Define breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: username },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Breadcrumb items={breadcrumbItems} />
          <h1 className={styles.title}>GitHub Profile Viewer</h1>
        </div>
      </header>

      <GitHubProvider>
        <main className={styles.main}>
          <div className={styles.content}>
            <UserProfileContent />
          </div>
        </main>
      </GitHubProvider>

      <Footer />
    </div>
  );
}
