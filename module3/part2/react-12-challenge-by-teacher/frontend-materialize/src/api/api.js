import axios from 'axios';

const BASE_URL = 'http://localhost:3001';
const URL_TODOS = `${BASE_URL}/todos`;

const YEARS = [2019, 2020, 2021];

const MONTHS = [
  { description: 'Jan', month: 1 },
  { description: 'Fev', month: 2 },
  { description: 'Mar', month: 3 },
  { description: 'Abr', month: 4 },
  { description: 'Mai', month: 5 },
  { description: 'Jun', month: 6 },
  { description: 'Jul', month: 7 },
  { description: 'Ago', month: 8 },
  { description: 'Set', month: 9 },
  { description: 'Out', month: 10 },
  { description: 'Nov', month: 11 },
  { description: 'Dez', month: 12 },
];

async function fetchJson(url) {
  const resource = await fetch(url);
  const json = await resource.json();
  return json;
}

export function getYears() {
  return [...YEARS];
}

export function getMonths() {
  return [...MONTHS];
}

export async function getTodosFrom(year, month) {
  const monthNumber = MONTHS.find(m => m.description === month).month;
  const urlTodos = `${URL_TODOS}?year=${year}&month=${monthNumber}`;

  const todos = await fetchJson(urlTodos);
  return todos.sort((a, b) => a.day - b.day);
}

export async function updateTodo(updatedTodo) {
  const { id } = updatedTodo;

  const { status } = await axios.put(`${URL_TODOS}/${id}`, updatedTodo);
  return status === 200;
}
