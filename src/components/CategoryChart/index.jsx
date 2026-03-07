import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = {
  'Alimentação': '#FF9F43', 'Transporte': '#45AAF2', 'Saúde': '#20B2AA',
  'Educação': '#A55EEF', 'Trabalho': '#4B7BEC', 'Moradia': '#D1D8E0',
  'Lazer': '#FD79A8', 'Outros': '#778ca3'
};

export function CategoryChart({ transactions }) {
  const data = transactions
    .filter(t => t.type === 'withdraw')
    .reduce((acc, t) => {
      const found = acc.find(item => item.name === t.category);
      if (found) found.value += t.value;
      else acc.push({ name: t.category, value: t.value });
      return acc;
    }, []);

  const totalWithdrawals = data.reduce((acc, item) => acc + item.value, 0);
  const isEmpty = data.length === 0;
  const chartData = isEmpty ? [{ name: 'Sem dados', value: 1 }] : data;

  return (
    <div style={{
      background: '#fff',
      height: '100%',
      borderRadius: '15px',
      padding: '1.5rem',
      border: 'solid #00000018 2px',
      display: 'flex',
      flexDirection: 'column', // Mantém o título no topo
      gap: '1rem'
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#363f5f' }}>Gastos por Categoria</h3>

      <div style={{
        display: 'flex',      // Novo container flex para alinhar gráfico e legenda LADO A LADO
        alignItems: 'center',
        flex: 1,
        width: '100%',
        gap: '1rem'
      }}>

        {/* Container do Gráfico */}
        <div style={{ width: '60%', height: '100%', position: 'relative' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                cornerRadius={4}
                dataKey="value"
                stroke="none"
              >
                {isEmpty
                  ? <Cell fill="#e7e9ee" />
                  : chartData.map((entry) => <Cell key={entry.name} fill={COLORS[entry.name]} />)
                }
              </Pie>
              {!isEmpty && <Tooltip /* ...mesmas props... */ />}
            </PieChart>
          </ResponsiveContainer>

          {/* Texto do Centro */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#969cb3' }}>Total</span>
            <strong style={{ fontSize: '0.8rem', color: '#363f5f' }}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalWithdrawals)}
            </strong>
          </div>
        </div>

        {/* Container da Legenda (Agora ao Lado) */}
        {!isEmpty && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr', // Uma coluna para empilhar verticalmente
            gap: '0.4rem',
            flex: 1
          }}>
            {data.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[item.name], marginRight: 6 }} />
                <span style={{ color: '#969cb3', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </span>
                <strong style={{ color: '#363f5f', marginLeft: '4px' }}>
                  {Math.round((item.value / totalWithdrawals) * 100)}%
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}