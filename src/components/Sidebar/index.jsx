import styles from './styles.module.css';
import { FaPlusCircle } from "react-icons/fa";

export function Sidebar({ onOpenNewTransactionModal }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.content}>
        <span className={styles.logo}> <img src='..\logo.png' width={24}></img>Moneta</span>
        <button className={styles.button} type="button"  onClick={onOpenNewTransactionModal}>
          <FaPlusCircle className='iconNewTransaction' size={24} />Nova transação
        </button>
      </div>
    </aside>
  );
}