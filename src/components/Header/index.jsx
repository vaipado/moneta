import styles from './styles.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <span className={styles.logo}>Moneta</span>
        <button type="button" className={styles.button}>
          Nova transação
        </button>
      </div>
    </header>
  );
}