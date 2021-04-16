import React from 'react';

export default function Summary({ items }) {
  const { titleStyle } = styles;

  return (
    <div>
      {SUMMARY.map(({ id, title, getValue, valueStyle }) => {
        return (
          <span key={id} style={{ marginRight: '20px' }}>
            <span style={titleStyle}>{title}</span>
            <span style={valueStyle}>{getValue(items)}</span>
          </span>
        );
      })}
    </div>
  );
}

const styles = {
  titleStyle: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },

  totalStyle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'darkblue',
  },

  doneStyle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#006266',
  },

  undoneStyle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#c23616',
  },
};

const SUMMARY = [
  {
    id: 's1',
    title: 'Total de tarefas: ',
    getValue: items => items.length,
    valueStyle: styles.totalStyle,
  },
  {
    id: 's2',
    title: 'Tarefas cumpridas: ',
    getValue: items => items.filter(t => t.done).length,
    valueStyle: styles.doneStyle,
  },
  {
    id: 's3',
    title: 'Tarefas não cumpridas: ',
    getValue: items => items.filter(t => !t.done).length,
    valueStyle: styles.undoneStyle,
  },
];
