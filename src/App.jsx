import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { TransactionsTable } from './components/TransationsTable';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 1rem' }}>
        <Summary />
        <TransactionsTable/>
      </main>
    </>
  );
}

export default App;