import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const monthNames = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

export function TrendChart({ transactions }) {
  const data = transactions
    .reduce((acc, t) => {
      const [day, month, year] = t.createdAt.split('/');
      const monthKey = `${month}/${year}`;

      const found = acc.find(item => item.monthKey === monthKey);

      if (found) {
        if (t.type === 'deposit') found.deposits += t.value;
        else found.withdrawals += t.value;
      } else {
        acc.push({
          monthKey,
          displayMonth: `${monthNames[Number(month) - 1]}/${year.slice(-2)}`,
          deposits: t.type === 'deposit' ? t.value : 0,
          withdrawals: t.type === 'withdraw' ? t.value : 0,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const [mA, yA] = a.monthKey.split('/');
      const [mB, yB] = b.monthKey.split('/');
      return new Date(yA, mA - 1) - new Date(yB, mB - 1);
    });

  return (
    <div style={{
      background: '#fff',
      borderRadius: '15px',
      padding: '1.5rem 1.5rem 3rem 1.5rem',
      border: 'solid #00000018 2px',
      width: '100%', 
      height: '100%',
      maxWidth: '100%',
      maxHeight: '420.6px'
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#363f5f' }}>Fluxo Mensal</h3>
      <div style={{ width: '100%', height: '100%', }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ left: 0 }}>
            <defs>
              <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#33cc95" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#33cc95" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWithdrawals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e52e4d" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#e52e4d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />

            <XAxis
              dataKey="displayMonth"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#969cb3', fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#969cb3', fontSize: 10 }}
              tickFormatter={(value) => `R$ ${value}`}
              width={80}
            />

            <Tooltip
              cursor={{ stroke: '#f0f2f5', strokeWidth: 2 }}
              contentStyle={{
                borderRadius: '0.5rem',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)}
            />

            <Legend verticalAlign="top" align="right" iconType="circle" height={40} />

            <Area
              name="Entradas"
              type="monotone"
              dataKey="deposits"
              stroke="#33cc95"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorDeposits)"
            />

            <Area
              name="Saídas"
              type="monotone"
              dataKey="withdrawals"
              stroke="#e52e4d"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWithdrawals)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}