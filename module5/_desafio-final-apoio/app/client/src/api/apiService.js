import axios from 'axios'

const API_URL = 'http://localhost:5555/api/transaction'

const getTransactionsByCompetence = async (yearMonth) => {
  const url = `${API_URL}/byCompetence/${yearMonth}`
  const data = await axios.get(url)
  return data.data
}

const updateTask = async (id, data) => {
  await axios.put(`${API_URL}/${id}`, data)
}
const create = async (data) => {
  await axios.post(`${API_URL}`, data)
}
const update = async (id, data) => {
  await axios.put(`${API_URL}/${id}`, data)
}

const remove = async (id) => {
  await axios.delete(`${API_URL}/${id}`)
}

export default {
  getTransactionsByCompetence,
  updateTask,
  create,
  update,
  remove,
}
