import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const AnaliseFinanceira = () => {
  const data = [
    {
      name: 'T1 2024',
      receita: 1636756.69,
      custos: 187400.87,
      percentual: 11.45,
      site: 69387.91,
      callCenter: 56448.26,
      projetos: 61564.70,
      efficiency: 8.73
    },
    {
      name: 'T2 2024',
      receita: 809703.55,
      custos: 179700.04,
      percentual: 22.19,
      site: 67384.08,
      callCenter: 43600.46,
      projetos: 68715.50,
      efficiency: 4.51
    },
    {
      name: 'T3 2024',
      receita: 609705.35,
      custos: 237840.61,
      percentual: 39.01,
      site: 71383.51,
      callCenter: 44791.46,
      projetos: 121665.64,
      efficiency: 2.56
    },
    {
      name: 'T4 2024',
      receita: 359259.02,
      custos: 205680.62,
      percentual: 57.25,
      site: 84835.35,
      callCenter: 40392.75,
      projetos: 80452.52,
      efficiency: 1.75
    },
    {
      name: 'T1 2025',
      receita: 506317.71,
      custos: 237478.68,
      percentual: 46.90,
      site: 132700.04,
      callCenter: 42252.26,
      projetos: 62526.38,
      efficiency: 2.13
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => `${value.toFixed(2)}%`;
  
  const customLabelFormatter = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
    
    return (
      <g>
        <text x={x + width / 2} y={y - radius} fill="#333" textAnchor="middle" dominantBaseline="middle">
          {customLabelFormatter(value)}
        </text>
      </g>
    );
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', color: '#4299e1' }}>Análise Financeira Trimestral</h1>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Receita x Custos Totais por Trimestre</h2>
        <div style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="receita" name="Receita" fill="#4299e1">
                <LabelList dataKey="receita" position="top" formatter={customLabelFormatter} />
              </Bar>
              <Bar dataKey="custos" name="Custos Totais" fill="#f56565">
                <LabelList dataKey="custos" position="top" formatter={customLabelFormatter} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Percentual de Custos sobre Receita</h2>
        <div style={{ height: '256px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatPercentage} domain={[0, 'dataMax + 5']} />
              <Tooltip formatter={(value) => formatPercentage(value)} />
              <Line 
                type="monotone" 
                dataKey="percentual" 
                name="% Custos/Receita" 
                stroke="#805ad5" 
                strokeWidth={2}
                dot={{ r: 6 }}
                label={(props) => {
                  const { x, y, value } = props;
                  return (
                    <text x={x} y={y - 10} fill="#805ad5" textAnchor="middle" dominantBaseline="middle">
                      {formatPercentage(value)}
                    </text>
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Composição dos Custos por Trimestre</h2>
        <div style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="site" name="Custos Site" stackId="a" fill="#ed8936" />
              <Bar dataKey="callCenter" name="Custos Call Center" stackId="a" fill="#e53e3e" />
              <Bar dataKey="projetos" name="Custos Projetos" stackId="a" fill="#4299e1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', position: 'relative' }}>
          Eficiência Operacional (Receita por R$ de Custo)
          <span style={{ marginLeft: '8px', display: 'inline-block', color: '#718096', cursor: 'help', position: 'relative' }}>
            ?
            <div style={{ 
              display: 'none', 
              position: 'absolute', 
              left: '0', 
              transform: 'translateY(-100%) translateX(-50%)',
              width: '256px',
              backgroundColor: '#1a202c', 
              color: 'white', 
              fontSize: '12px', 
              borderRadius: '4px', 
              padding: '8px',
              zIndex: '10',
              pointerEvents: 'none'
            }}>
              <strong>Cálculo:</strong> Receita Total ÷ Custos Totais
              <br /><br />
              <strong>Exemplo T1 2024:</strong><br />
              R$ 1.636.756,69 ÷ R$ 187.400,87 = 8,73
              <br /><br />
              Para cada R$ 1,00 gasto em custos, a empresa gerou R$ 8,73 em receita.
            </div>
          </span>
        </h2>
        <div style={{ height: '256px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 'dataMax + 1']} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                name="Eficiência" 
                stroke="#ed8936" 
                strokeWidth={2}
                dot={{ r: 6 }}
                label={(props) => {
                  const { x, y, value } = props;
                  return (
                    <text x={x} y={y - 10} fill="#ed8936" textAnchor="middle" dominantBaseline="middle">
                      {value.toFixed(2)}
                    </text>
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Principais Insights</h3>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>Queda contínua na receita durante 2024: <strong>-78%</strong> do T1 ao T4</li>
            <li style={{ marginBottom: '8px' }}>Aumento de <strong>+41%</strong> na receita do T4 2024 para T1 2025</li>
            <li style={{ marginBottom: '8px' }}>Percentual de custos cresceu de <strong>11,5%</strong> para <strong>57,3%</strong> em 2024</li>
            <li style={{ marginBottom: '8px' }}>Melhora da eficiência operacional no T1 2025 em relação ao T4 2024 (<strong>+21,7%</strong>)</li>
          </ul>
        </div>

        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Possiveis Alertas</h3>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>Investigar causas da queda de receita em 2024 e fatores de recuperação em 2025</li>
            <li style={{ marginBottom: '8px' }}>Estrutura de custos do Call Center que aumentou durante 2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnaliseFinanceira;