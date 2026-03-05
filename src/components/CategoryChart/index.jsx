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

  const isEmpty = data.length === 0;
  const chartData = isEmpty ? [{ name: 'Sem dados', value: 1 }] : data;

  return (
    <div style={{ background: '#fff', borderRadius: '0.25rem', padding: '1rem', flex: 1 }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: '#969cb3' }}>Gastos por Categoria</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {isEmpty 
                ? <Cell fill="#e7e9ee" />
                : chartData.map((entry) => <Cell key={entry.name} fill={COLORS[entry.name]} />)
              }
            </Pie>
            {!isEmpty && <Tooltip formatter={(val) => `R$ ${val.toFixed(2)}`} />}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}