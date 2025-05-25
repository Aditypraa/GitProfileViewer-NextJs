import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        © {currentYear}{' '}
        <Link href="https://github.com/Aditypraa">Aditya Pratama</Link>
      </p>
    </footer>
  );
}
