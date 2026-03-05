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
      borderRadius: '0.25rem', 
      padding: '1.5rem', 
      flex: 1, 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 500, color: '#363f5f' }}>Gastos por Categoria</h3>
      
      <div style={{ width: '100%', height: 250, position: 'relative' }}>
        <ResponsiveContainer>
          <PieChart style={{ zIndex: 10 }}>
            <Pie
              data={chartData}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={4} 
              cornerRadius={4}
              dataKey="value"
              stroke="none"
            >
              {isEmpty 
                ? <Cell fill="#e7e9ee" />
                : chartData.map((entry) => <Cell key={entry.name} fill={COLORS[entry.name]} />)
              }
            </Pie>
            {!isEmpty && (
              <Tooltip 
                wrapperStyle={{ zIndex: 100 }}
                contentStyle={{ borderRadius: '0.25rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                formatter={(val) => `R$ ${val.toFixed(2)}`} 
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <span style={{ display: 'block', fontSize: '0.875rem', color: '#969cb3' }}>Total</span>
          <strong style={{ fontSize: '1.25rem', color: '#363f5f' }}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalWithdrawals)}
          </strong>
        </div>
      </div>

      {!isEmpty && (
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {data.map(item => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[item.name], marginRight: 8 }} />
              <span style={{ color: '#969cb3', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
              <strong style={{ color: '#363f5f', marginLeft: '4px' }}>{Math.round((item.value / totalWithdrawals) * 100)}%</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}