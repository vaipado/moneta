import styles from './styles.module.css';

export function TransactionsTable() {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de Website</td>
            <td className={styles.deposit}>R$ 12.000,00</td>
            <td>Venda</td>
            <td>20/02/2026</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className={styles.withdraw}>- R$ 1.100,00</td>
            <td>Casa</td>
            <td>10/02/2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}