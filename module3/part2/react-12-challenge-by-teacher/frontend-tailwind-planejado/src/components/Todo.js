import React from 'react';
import { helperFormatDate } from '../helpers/dateHelpers';

export default function Todo({ children: todo, onToggle = null }) {
  function handleClick() {
    if (onToggle) {
      onToggle(todo);
    }
  }

  const todoClassName = todo.done ? 'bg-green-100' : 'bg-red-100';

  const { year, month, day } = todo;

  const formattedDate = helperFormatDate(year, month, day);

  return (
    <div
      className={`m-2 p-2 rounded-lg 
                 flex flex-row items-center justify-start space-x-4 
                 cursor-pointer
                 ${todoClassName}`}
      onClick={handleClick}
    >
      <span className="font-semibold text-lg">{formattedDate}</span>

      <span>{todo.description}</span>
    </div>
  );
}
