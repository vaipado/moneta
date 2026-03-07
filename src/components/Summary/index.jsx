import styles from './styles.module.css';
import { PiHandWithdrawFill, PiHandDepositFill } from "react-icons/pi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

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
      <div className={styles.card}>
        {<PiHandDepositFill size={35} />}
        <div>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.deposits)}
          </strong>
          <header>
            <p>Entradas</p>
          </header>
        </div>
      </div>

      <div className={styles.card}>
        {<PiHandWithdrawFill size={35} />}

        <div>
          <strong className={styles.withdraw}>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.withdrawals)}
          </strong>
          <header>
            <p>Saídas</p>
          </header>
        </div>
      </div>

      <div className={(summary.total < 0) ? styles.totalRed : styles.totalGreen}>
        {<RiMoneyDollarCircleFill size={35} />}
        <div>
          <strong >
            {(summary.total < 0) ? new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.total * (-1)) : new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.total)}
          </strong>
          <header>
            <p>Total</p>
          </header>
        </div>
      </div>
    </div>
  );
}