import React from 'react';

export default function Main({ children = 'Conteúdo do Main' }) {
  return (
    <main>
      <div className="container mx-auto p-4">
        <h2>{children}</h2>
      </div>
    </main>
  );
}
