import React from 'react';

export default function Summary({ total, done, undone }) {
  return (
    <div className="flex flex-row items-center justify-center space-x-4 bg-gray-100 py-4">
      <span>
        Total de tarefas:{' '}
        <span className="text-blue-900 font-bold">{total}</span>
      </span>

      <span>
        Tarefas cumpridas:{' '}
        <span className="text-green-900 font-bold">{done}</span>
      </span>

      <span>
        Tarefas não cumpridas:{' '}
        <span className="text-red-900 font-bold">{undone}</span>
      </span>
    </div>
  );
}
