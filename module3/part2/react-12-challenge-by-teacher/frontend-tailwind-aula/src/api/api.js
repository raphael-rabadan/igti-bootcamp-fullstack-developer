import axios from 'axios';

const MONTH_DESCRIPTIONS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const YEARS = [2019, 2020, 2021].map(year => ({
  id: year,
  description: year.toString(),
}));

export const MONTHS = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  description: MONTH_DESCRIPTIONS[index],
}));

export async function apiGetTodosFrom(year, month) {
  const url = `http://localhost:3001/todos?year=${year}&month=${month}`;
  const { data } = await axios.get(url);

  return data.sort((a, b) => a.date.localeCompare(b.date));
}

export async function apiUpdateTodo(updatedTodo) {
  const url = `http://localhost:3001/todos/${updatedTodo.id}`;
  await axios.put(url, updatedTodo);
}
