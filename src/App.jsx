import { useState, useEffect } from 'react';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Modal from 'react-modal';
import { Sidebar } from './components/Sidebar';
import { Summary } from './components/Summary';
import { TransactionsTable } from './components/TransactionsTable';
import { EmptyState } from './components/EmptyState';
import { CategoryChart } from './components/CategoryChart';
import { TrendChart } from './components/TrendChart';
import './index.css';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false); // Controla o modal
  const [search, setSearch] = useState(''); // Controla a pesquisa
  // Valor padrão dos inputs
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Alimentação');
  const [type, setType] = useState('deposit');
  const [date, setDate] = useState('');

  const [transactions, setTransactions] = useState(() => {
    const storageTransactions = localStorage.getItem('@moneta:transactions'); // Busca oque ja estava salvo no localStorage

    if (storageTransactions) { // Se há conteúdo na variável...
      return JSON.parse(storageTransactions); // Retorna transformando string em objeto manipulável
    } // Se não...
    return []; // Retorna um array vazio
  });

  useEffect(() => { // useEffect executa a função anônima quando 'transactions' muda
    localStorage.setItem('@moneta:transactions', JSON.stringify(transactions)) // Salva o conteúdo do 'transactions' no localStorage (a alternativa que usei para simular um banco de dados simples)
  }, [transactions]);

  // JSON.stringify(transactions) - como o localStorage recebe apenas strings simples, eu transformo o objeto manipulável em string

  function handleOpenNewTransactionModal() { // Função para abrir o modal (mudar o valor da isNewTransactionModalOpen para true)
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() { // Função para fechar o modal (mudar o valor da useState para false e 'resetar' os valores dos inputs)
    setIsNewTransactionModalOpen(false);
    setTitle('');
    setValue('');
    setCategory('Alimentação');
    setType('deposit');
    setDate('');
  }

  function handleDeleteTransaction(id) { // Função para deletar transações pelo seu id específico
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id); // Variável responsável por guardar o novo array gerado
    // transactions.filter(transaction => transaction.id !== id) - percorre o array mantendo apenas os itens que atendem a condição determinada
    setTransactions(updatedTransactions); // Garante que o React redenrize a mudança na 'transactions'
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
    <div className="wrapper">
      <Sidebar onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <main className="main-container">
        <div className="dashboard-grid">
          { }
          <div className="grid-summary">
            <Summary transactions={transactions} />
          </div>

          { }
          <div className="grid-category-chart">
            <CategoryChart transactions={transactions} />
          </div>

          { }
          <div className="grid-trend-chart">
            <TrendChart transactions={transactions} />
          </div>

          { }
          <div className="grid-transactions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="table-wrapper">
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
            </div>
          </div>
        </div>

        { }

        <footer className="footer">
          <div>
            <p className="copyright">Copyright &copy; 2026 Carlos Godinho</p>
            <p>Contato</p>
          </div>
          <div className="social-icons">
            <FaGithubSquare size={25} />
            <FaLinkedin size={25} />
          </div>
        </footer>
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
    </div>
  );
}

export default App;