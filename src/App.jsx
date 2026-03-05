import { useState, useEffect } from 'react';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import Modal from 'react-modal';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { TransactionsTable } from './components/TransactionsTable';
import { EmptyState } from './components/EmptyState';
import { CategoryChart } from './components/CategoryChart';
import { TrendChart } from './components/TrendChart';
import './index.css';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Alimentação');
  const [type, setType] = useState('deposit');
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');

  const [transactions, setTransactions] = useState(() => {
    const storageTransactions = localStorage.getItem('@moneta:transactions');

    if (storageTransactions) {
      return JSON.parse(storageTransactions);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@moneta:transactions', JSON.stringify(transactions));
  }, [transactions]);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
    setTitle('');
    setValue('');
    setCategory('Alimentação');
    setType('deposit');
    setDate('');
  }

  function handleDeleteTransaction(id) {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  }

  function handleCreateNewTransaction(event) {
    event.preventDefault();

    const numericValue = Number(value);

    if (title.trim() === '' || numericValue <= 0 || !date) {
      alert("Por favor, preencha todos os campos corretamente!");
      return;
    }

    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    const newTransaction = {
      id: Math.random(),
      title,
      value: numericValue,
      category,
      type,
      createdAt: formattedDate
    };

    setTransactions([...transactions, newTransaction]);
    handleCloseNewTransactionModal();
  }

  const isFormValid = title.trim() !== '' && Number(value) > 0 && category.trim() !== '' && date !== '';

  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 1rem' }}>
        <Summary transactions={transactions} />

        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <CategoryChart transactions={transactions} />
          <TrendChart transactions={transactions} />
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {transactions.length === 0 ? (
          <EmptyState />
        ) : filteredTransactions.length > 0 ? (
          <TransactionsTable
            transactions={filteredTransactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        ) : (
          <div className="search-not-found">
            <p>Nenhuma transação encontrada com o termo <strong>"{search}"</strong>.</p>
          </div>
        )}
      </main>

      <Modal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={handleCloseNewTransactionModal}
          className="react-modal-close"
        >
          X
        </button>

        <form className="modal-form" onSubmit={handleCreateNewTransaction}>
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

          <input
            type="date"
            value={date}
            onChange={event => setDate(event.target.value)}
            style={{ marginTop: '1rem' }}
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

          <select
            value={category}
            onChange={event => setCategory(event.target.value)}
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Moradia">Moradia</option>
            <option value="Lazer">Lazer</option>
            <option value="Outros">Outros</option>
          </select>

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