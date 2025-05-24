'use client';

import Image from 'next/image';
import { useGitHub } from '@/context/GitHubContext';
import styles from './UserProfile.module.css';

interface UserProfileProps {
  compact?: boolean;
}

export default function UserProfile({ compact = false }: UserProfileProps) {
  const { user } = useGitHub();

  if (!user) return null;

  if (compact) {
    return (
      <div className={`${styles.profile} ${styles.compact}`}>
        <div className={styles.avatar}>
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={60}
            height={60}
            priority
          />
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>{user.name || user.login}</h2>
          <p className={styles.username}>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              @{user.login}
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Image
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={120}
          height={120}
          priority
        />
      </div>

      <div className={styles.info}>
        <h2 className={styles.name}>{user.name || user.login}</h2>
        <p className={styles.username}>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            @{user.login}
          </a>
        </p>

        {user.bio && <p className={styles.bio}>{user.bio}</p>}

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.public_repos}</span>
            <span className={styles.statLabel}>Repositories</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.followers}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.following}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
        </div>

        <div className={styles.details}>
          {user.location && (
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>📍</span>
              <span>{user.location}</span>
            </div>
          )}

          {user.blog && (
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>🔗</span>
              <a
                href={
                  user.blog.startsWith('http')
                    ? user.blog
                    : `https://${user.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {user.blog}
              </a>
            </div>
          )}

          {user.company && (
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>🏢</span>
              <span>{user.company}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
