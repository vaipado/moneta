import styles from './styles.module.css';

export function Header({ onOpenNewTransactionModal }) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <span className={styles.logo}>Moneta</span>
        <button 
          type="button" 
          className={styles.button}
          onClick={onOpenNewTransactionModal} // Chamamos a função aqui
        >
          Nova transação
        </button>
      </div>
    </header>
  );
}