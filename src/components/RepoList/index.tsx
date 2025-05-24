'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGitHub } from '@/context/GitHubContext';
import styles from './RepoList.module.css';
import { formatDate } from '@/lib/formatDate';
import { getLanguageColor } from '@/lib/languageColor';

export default function RepoList() {
  const { repos, user } = useGitHub();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const router = useRouter();

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
            placeholder="Filter repositories..."
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
                    ></span>
                    {repo.language}
                  </span>
                )}

                {repo.stargazers_count > 0 && (
                  <span className={styles.stars}>
                    ⭐ {repo.stargazers_count}
                  </span>
                )}

                {repo.forks_count > 0 && (
                  <span className={styles.forks}>🍴 {repo.forks_count}</span>
                )}

                <time className={styles.updated} dateTime={repo.updated_at}>
                  Updated {formatDate(repo.updated_at)}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
