import React from 'react';

export default function Todo({ children: todo, onTodoToggle = null }) {
  const { id, done, description, date } = todo;

  function handleClick() {
    if (onTodoToggle) {
      onTodoToggle(id);
    }
  }

  const backgroundColorClassName = done ? 'bg-green-200' : 'bg-red-200';

  return (
    <div
      onClick={handleClick}
      className={`m-4 p-2 
                  border rounded-md 
                  flex flex-row items-center justify-start space-x-4
                  cursor-pointer
                  ${backgroundColorClassName}`}
    >
      <span>{date.split('-').reverse().join('/')}</span>
      <span>{description}</span>
    </div>
  );
}
