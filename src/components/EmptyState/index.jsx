import styles from './styles.module.css';

export function EmptyState() {
  return (
    <div className={styles.container}>
      <h2>Nenhuma transação por aqui...</h2>
      <p>Parece que o seu saldo está à espera do primeiro registro. <br /> 
         Clique em <strong>Nova transação</strong> para começar!</p>
    </div>
  );
}