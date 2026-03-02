import { useState, useEffect } from 'react';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import Modal from 'react-modal';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { TransactionsTable } from './components/TransactionsTable';
import { EmptyState } from './components/EmptyState';
import './index.css';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit'); // 'deposit' para entrada, 'withdraw' para saída
  const [transactions, setTransactions] = useState(() => {
    // Pega os dados salvos
    const storageTransactions = localStorage.getItem('@moneta:transactions');

    if (storageTransactions) {
      // Se existir algo, transformamos de volta em Objeto/Array
      return JSON.parse(storageTransactions);
    }
    // Se não existir nada, começa com array vazio
    return [];
  });

  // Sempre que 'transactions' mudar, salvamos no localStorage
  useEffect(() => { localStorage.setItem('@moneta:transactions', JSON.stringify(transactions)); }, [transactions]);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);

    setTitle('');
    setValue('');
    setCategory('');
    setType('deposit');
  }

  function handleDeleteTransaction(id) {
    // Criamos uma nova lista filtrando (removendo) o item com o ID recebido
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);

    // Atualizamos o estado com a nova lista
    setTransactions(updatedTransactions);
  }

  function handleCreateNewTransaction(event) {
    event.preventDefault();

    const numericValue = Number(value);

    if (title.trim() === '' || numericValue <= 0) {
      alert("Por favor, preencha um título e um valor válido!");
      return;
    }

    const newTransaction = {
      id: Math.random(),
      title,
      value: Number(value),
      category,
      type,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    setTransactions([...transactions, newTransaction]);
    handleCloseNewTransactionModal();
  }

const isFormValid = title.trim() !== '' && Number(value) > 0 && category.trim() !== '';

  return (
    <>
      { }
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 1rem' }}>
        <Summary transactions={transactions} />
        {
          transactions.length > 0 ? (<TransactionsTable transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />)
            : (<EmptyState />)
        }
      </main>

      {/* Estrutura do Modal */}
      <Modal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        overlayClassName="react-modal-overlay" //
        className="react-modal-content" //
      >
        <button
          type="button"
          onClick={handleCloseNewTransactionModal}
          className="react-modal-close" //
        >
          X
        </button>

        <form className="modal-form" onSubmit={handleCreateNewTransaction}> { }
          <h2>Cadastrar transação</h2>

          <input
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <div className="transaction-type-container">
            <button
              type="button"
              onClick={() => setType('deposit')}
              className={type === 'deposit' ? 'active-deposit' : ''}
            >
              <FiArrowUpCircle size={24} color="#33cc95" />
              <span>Entrada</span>
            </button>

            <button
              type="button"
              onClick={() => setType('withdraw')}
              className={type === 'withdraw' ? 'active-withdraw' : ''}
            >
              <FiArrowDownCircle size={24} color="#e52e4d" />
              <span>Saída</span>
            </button>
          </div>

          <input
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <button
            type="submit"
            disabled={!isFormValid}
            className="submit-button"
          >
            Cadastrar
          </button>
        </form>
      </Modal>
    </>
  );
}

export default App;