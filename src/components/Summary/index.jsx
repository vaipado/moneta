import styles from './styles.module.css';

export function Summary() {
  return (
    <div className={styles.container}>
      <div>
        <header>
          <p>Entradas</p>
        </header>
        <strong>R$ 0,00</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
        </header>
        <strong className={styles.withdraw}>- R$ 0,00</strong>
      </div>
      <div className={styles.highlightBackground}>
        <header>
          <p>Total</p>
        </header>
        <strong>R$ 0,00</strong>
      </div>
    </div>
  );
}