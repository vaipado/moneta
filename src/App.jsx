import { useState, useEffect } from 'react';
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
  const [value, setValue] = useState(0);
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
  }

  function handleDeleteTransaction(id) {
    // Criamos uma nova lista filtrando (removendo) o item com o ID recebido
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);

    // Atualizamos o estado com a nova lista
    setTransactions(updatedTransactions);
  }

  function handleCreateNewTransaction(event) {
    event.preventDefault();

    const newTransaction = {
      id: Math.random(),
      title,
      value,
      category,
      type,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    setTransactions([...transactions, newTransaction]);

    // Limpa os campos e fecha o modal após o "cadastro"
    setTitle('');
    setValue(0);
    setCategory('');
    setType('deposit');
    handleCloseNewTransactionModal();
  }

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
            onChange={event => setValue(Number(event.target.value))}
          />

          <div className="transaction-type-container">
            <button
              type="button"
              onClick={() => setType('deposit')}
              className={type === 'deposit' ? 'active-deposit' : ''}
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setType('withdraw')}
              className={type === 'withdraw' ? 'active-withdraw' : ''}
            >
              Saída
            </button>
          </div>

          <input
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <button type="submit">
            Cadastrar
          </button>
        </form>
      </Modal>
    </>
  );
}

export default App;