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
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type === 'deposit' ? styles.deposit : styles.withdraw}>
                {transaction.type === 'withdraw' && '- '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.value)}
              </td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
              <td>
                <button 
                  type="button" 
                  onClick={() => onDeleteTransaction(transaction.id)}
                  style={{ background: 'transparent', border: 0, color: '#e52e4d', cursor: 'pointer', fontWeight: 'bold' }}
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