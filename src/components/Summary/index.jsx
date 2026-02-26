import styles from './styles.module.css';

export function Summary({ transactions }) {
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.value;
      acc.total += transaction.value;
    } else {
      acc.withdrawals += transaction.value;
      acc.total -= transaction.value;
    }

    return acc;
  }, {
    deposits: 0,
    withdrawals: 0,
    total: 0,
  });

  return (
    <div className={styles.container}>
      <div>
        <header>
          <p>Entradas</p>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
        </header>
        <strong className={styles.withdraw}>
          - {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdrawals)}
        </strong>
      </div>

      <div className={styles.highlightBackground}>
        <header>
          <p>Total</p>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </div>
  );
}