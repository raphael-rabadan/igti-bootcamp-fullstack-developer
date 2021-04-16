import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';

import { apiGetTodosFrom, apiUpdateTodo, MONTHS, YEARS } from '../api/api';
import Select from '../components/Select';
import Loading from '../components/Loading';
import Summary from '../components/Summary';
import Todos from '../components/Todos';
import Todo from '../components/Todo';

function getCurrentYear() {
  return new Date().getFullYear();
}

function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

export default function TodosPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedTodos, setSelectedTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      setIsLoading(true);
      const todos = await apiGetTodosFrom(selectedYear, selectedMonth);
      setSelectedTodos(todos);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    getTodos();
  }, [selectedYear, selectedMonth]);

  function handleYearChange(newYear) {
    setSelectedYear(newYear);
  }

  function handleMonthChange(newMonth) {
    setSelectedMonth(newMonth);
  }

  async function handleToggleTodo(todo) {
    const { id } = todo;
    const updatedTodo = { ...todo, done: !todo.done };

    await apiUpdateTodo(updatedTodo);

    const updatedTodos = [...selectedTodos];
    const index = selectedTodos.findIndex(todo => todo.id === id);
    updatedTodos[index] = updatedTodo;

    setSelectedTodos(updatedTodos);
  }

  let data = (
    <div className="flex flex-col items-center justify-center mt-8">
      <Loading />
    </div>
  );

  if (!isLoading) {
    const totalTodos = selectedTodos.length;
    const doneTodos = selectedTodos.filter(todo => todo.done).length;
    const undoneTodos = totalTodos - doneTodos;

    data = (
      <div>
        <Summary total={totalTodos} done={doneTodos} undone={undoneTodos} />

        <Todos>
          {selectedTodos.map(todo => (
            <Todo key={todo.id} onToggle={handleToggleTodo}>
              {todo}
            </Todo>
          ))}
        </Todos>
      </div>
    );
  }

  return (
    <div>
      <Header>react-todos</Header>

      <Main>
        <div className="flex flex-col space-y-4">
          <Select
            labelDescription="Escolha um ano:"
            options={YEARS}
            selectValue={selectedYear}
            onSelect={handleYearChange}
          />

          <Select
            labelDescription="Escolha um mês:"
            options={MONTHS}
            selectValue={selectedMonth}
            onSelect={handleMonthChange}
          />

          {data}
        </div>
      </Main>
    </div>
  );
}
