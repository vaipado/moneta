import styles from './styles.module.css';

export function TransactionsTable({ transactions, onDeleteTransaction }) {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className={styles.title}>{transaction.title}</td>
              <td className={transaction.type === 'deposit' ? styles.deposit : styles.withdraw}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.value)}
              </td>
              <td>
                <span className={styles.categoryBadge}>
                  {transaction.category}
                </span>
              </td>
              <td className={styles.date}>{transaction.createdAt}</td>
              <td>
                <button 
                  type="button" 
                  className={styles.deleteButton}
                  onClick={() => onDeleteTransaction(transaction.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}