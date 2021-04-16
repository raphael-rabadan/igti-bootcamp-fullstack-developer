import React from 'react';

import ButtonContainer from './components/ButtonContainer';
import Button from './components/Button';

import * as api from './api/api';
import Todos from './components/Todos';
import Todo from './components/Todo';
import Summary from './components/Summary';

export default function App() {
  const [selectedYear, setSelectedYear] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [selectedTodos, setSelectedTodos] = React.useState([]);

  React.useEffect(() => {
    if (!selectedMonth) {
      setSelectedTodos([]);
      return;
    }

    async function getTodos() {
      const todos = await api.getTodosFrom(selectedYear, selectedMonth);
      setSelectedTodos(todos);
    }

    getTodos();
  }, [selectedMonth, selectedYear]);

  function handleYearClick(yearClicked) {
    setSelectedYear(yearClicked);
  }

  function handleMonthClick(monthClicked) {
    setSelectedMonth(monthClicked);
  }

  function handleTodoClick(todo) {
    const updatedTodo = { ...todo, done: !todo.done };

    api.updateTodo(updatedTodo).then(updated => {
      if (updated) {
        const { id } = todo;
        const newTodos = [...selectedTodos];
        const index = selectedTodos.findIndex(t => t.id === id);
        newTodos[index] = updatedTodo;
        setSelectedTodos(newTodos);
      }
    });
  }

  const years = api.getYears();
  const months = api.getMonths();

  return (
    <div className="container">
      <h1 className="center">React Todos</h1>

      <ButtonContainer>
        {years.map(year => (
          <Button
            key={year}
            selected={year === selectedYear}
            onClick={handleYearClick}
          >
            {year}
          </Button>
        ))}
      </ButtonContainer>

      {selectedYear && (
        <ButtonContainer>
          {months.map(({ month, description }) => (
            <Button
              key={month}
              selected={description === selectedMonth}
              onClick={handleMonthClick}
              mainColor="red"
            >
              {description}
            </Button>
          ))}
        </ButtonContainer>
      )}

      {selectedMonth && (
        <>
          <Summary items={selectedTodos} />

          <Todos>
            {selectedTodos.map((todo, index, todos) => {
              const currentDay = todo.day;
              const nextDay =
                index === todos.length - 1 ? -1 : todos[index + 1].day;

              const differentDay = currentDay !== nextDay;

              return (
                <Todo
                  key={todo.id}
                  onClick={handleTodoClick}
                  differentDay={differentDay}
                >
                  {todo}
                </Todo>
              );
            })}
          </Todos>
        </>
      )}
    </div>
  );
}
