import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TrendChart({ transactions }) {
  // Processa dados para agrupar entradas e saídas por data
  const data = transactions
    .reduce((acc, t) => {
      const date = t.createdAt;
      const found = acc.find(item => item.date === date);

      if (found) {
        if (t.type === 'deposit') found.deposits += t.value;
        else found.withdrawals += t.value;
      } else {
        acc.push({
          date,
          deposits: t.type === 'deposit' ? t.value : 0,
          withdrawals: t.type === 'withdraw' ? t.value : 0,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      // Ordenação cronológica baseada no formato DD/MM/YYYY
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateA - dateB;
    });

  return (
    <div style={{ background: '#fff', borderRadius: '0.25rem', padding: '1rem', flex: 2 }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: '#969cb3' }}>Fluxo de Caixa</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e9ee" />
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip 
              formatter={(val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)}
            />
            <Legend verticalAlign="top" align="right" height={36}/>
            
            {/* Linha de Entradas (Verde) */}
            <Line 
              name="Entradas"
              type="monotone" 
              dataKey="deposits" 
              stroke="#33cc95" 
              strokeWidth={3} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            
            {/* Linha de Saídas (Vermelho) */}
            <Line 
              name="Saídas"
              type="monotone" 
              dataKey="withdrawals" 
              stroke="#e52e4d" 
              strokeWidth={3} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}