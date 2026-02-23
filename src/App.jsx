import { useState } from 'react';
import Modal from 'react-modal';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { TransactionsTable } from './components/TransactionsTable';
import './index.css';

// Configuração obrigatória para acessibilidade, basicamente, quando o modal abrir, os leitores de tela vão ignorar o restante do conteúdo da página
Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      {/* a função de abrir é passada para o Header */}
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 1rem' }}>
        <Summary />
        <TransactionsTable />
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

        <form className="modal-form">
          <h2>Cadastrar transação</h2>

          <input placeholder="Título" />
          <input type="number" placeholder="Valor" />

          <div className="transaction-type-container">
            <button type="button">
              Entrada
            </button>
            <button type="button">
              Saída
            </button>
          </div>

          <input placeholder="Categoria" />

          <button type="submit">
            Cadastrar
          </button>
        </form>
      </Modal>
    </>
  );
}

export default App;