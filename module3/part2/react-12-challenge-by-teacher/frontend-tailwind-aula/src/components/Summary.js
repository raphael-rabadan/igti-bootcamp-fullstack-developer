import React from 'react';

export default function Summary({ total = 10, done = 8, undone = 2 }) {
  return (
    <div className="mt-4 flex flex-row items-center justify-center space-x-2">
      <span>Total: {total}</span>
      <span>Cumpridas: {done}</span>
      <span>Não-cumpridas: {undone}</span>
    </div>
  );
}
