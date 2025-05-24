'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const router = useRouter();

  // Handle item click based on whether it has an href or not
  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <div key={index} className={styles.breadcrumbItem}>
          {index > 0 && <span className={styles.separator}>/</span>}

          {item.href ? (
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <button
              onClick={() => handleItemClick(item)}
              className={styles.button}
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
