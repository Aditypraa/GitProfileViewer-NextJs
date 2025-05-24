import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Built with Next.js and GitHub API</p>
      <br />
      <p>
        © <Link href="https://github.com/Aditypraa">Aditya Pratama</Link>
      </p>
    </footer>
  );
}
