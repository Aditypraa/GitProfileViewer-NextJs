'use client';

import Image from 'next/image';
import { useGitHub } from '@/context/GitHubContext';
import styles from './UserProfile.module.css';
import { useEffect, useState } from 'react';

interface UserProfileProps {
  compact?: boolean;
}

export default function UserProfile({ compact = false }: UserProfileProps) {
  const { user } = useGitHub();
  const [avatarSize, setAvatarSize] = useState(compact ? 60 : 120);

  useEffect(() => {
    // Set avatar size based on screen width and compact mode
    const updateAvatarSize = () => {
      if (compact) {
        setAvatarSize(window.innerWidth <= 600 ? 50 : 60);
      } else {
        setAvatarSize(window.innerWidth <= 480 ? 80 : 120);
      }
    };

    // Run on mount and window resize
    updateAvatarSize();
    window.addEventListener('resize', updateAvatarSize);

    return () => {
      window.removeEventListener('resize', updateAvatarSize);
    };
  }, [compact]);

  if (!user) return null;

  if (compact) {
    return (
      <article className={`${styles.profile} ${styles.compact}`}>
        <div className={styles.avatar}>
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={avatarSize}
            height={avatarSize}
            priority
          />
        </div>

        <section className={styles.info}>
          <h2 className={styles.name}>{user.name || user.login}</h2>
          <p className={styles.username}>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              @{user.login}
            </a>
          </p>
        </section>
      </article>
    );
  }

  return (
    <article className={styles.profile}>
      <div className={styles.avatar}>
        <Image
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={avatarSize}
          height={avatarSize}
          priority
        />
      </div>

      <section className={styles.info}>
        <h2 className={styles.name}>{user.name || user.login}</h2>
        <p className={styles.username}>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            @{user.login}
          </a>
        </p>

        {user.bio && <p className={styles.bio}>{user.bio}</p>}

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Repositories</dt>
            <dd className={styles.statValue}>{user.public_repos}</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Followers</dt>
            <dd className={styles.statValue}>{user.followers}</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Following</dt>
            <dd className={styles.statValue}>{user.following}</dd>
          </div>
        </dl>

        <address className={styles.details}>
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
        </address>
      </section>
    </article>
  );
}
