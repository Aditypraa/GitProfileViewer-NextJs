'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGitHub } from '@/context/GitHubContext';
import styles from './RepoList.module.css';
import { formatDate } from '@/utils/formatDate';
import { getLanguageColor } from '@/utils/languageColor';

export default function RepoList() {
  const { repos, user } = useGitHub();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive breakpoints
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

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(filter.toLowerCase()) ||
      (repo.description &&
        repo.description.toLowerCase().includes(filter.toLowerCase())),
  );

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === 'updated') {
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    } else if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const handleRepoClick = (repo: { slug: string; id: number }) => {
    if (user) {
      router.push(`/${user.login}/${repo.slug || ''}`);
    }
  };

  if (repos.length === 0) return null;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Repositories ({repos.length})</h2>
        <div className={styles.filters}>
          <label htmlFor="repo-filter" className="sr-only">
            Filter repositories
          </label>
          <input
            id="repo-filter"
            type="text"
            placeholder={isMobile ? 'Filter...' : 'Filter repositories...'}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterInput}
          />
          <label htmlFor="repo-sort" className="sr-only">
            Sort repositories
          </label>
          <select
            id="repo-sort"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'updated' | 'stars' | 'name')
            }
            className={styles.sortSelect}
            aria-label="Sort repositories by"
          >
            <option value="updated">Recently updated</option>
            <option value="stars">Stars</option>
            <option value="name">Name</option>
          </select>
        </div>
      </header>

      {sortedRepos.length === 0 ? (
        <p className={styles.noResults}>No repositories match your filter</p>
      ) : (
        <ul className={styles.repoList}>
          {sortedRepos.map((repo) => (
            <li
              key={repo.id}
              className={styles.repoItem}
              onClick={() =>
                handleRepoClick(repo as { slug: string; id: number })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleRepoClick(repo as { slug: string; id: number });
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View repository: ${repo.name}`}
            >
              <h3 className={styles.repoName}>{repo.name}</h3>
              {repo.description && (
                <p className={styles.repoDescription}>{repo.description}</p>
              )}

              <div className={styles.repoMeta}>
                {repo.language && (
                  <span className={styles.language}>
                    <span
                      className={styles.languageDot}
                      style={{
                        backgroundColor: getLanguageColor(repo.language),
                      }}
                      aria-hidden="true"
                    ></span>
                    {repo.language}
                  </span>
                )}

                {repo.stargazers_count > 0 && (
                  <span className={styles.stars} title="Stars">
                    ⭐ {repo.stargazers_count}
                  </span>
                )}

                {repo.forks_count > 0 && (
                  <span className={styles.forks} title="Forks">
                    🍴 {repo.forks_count}
                  </span>
                )}

                <time
                  className={styles.updated}
                  dateTime={repo.updated_at}
                  title="Last updated"
                >
                  {isMobile
                    ? formatDate(repo.updated_at, true)
                    : `Updated ${formatDate(repo.updated_at)}`}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
