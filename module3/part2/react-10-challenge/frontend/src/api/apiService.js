import axios from 'axios'

const API_URL = 'http://localhost:3001/todos'

const getAllActivities = async () => {
  const data = await axios.get(API_URL)
  return data
}

const updateTask = async (id, data) => {
  await axios.put(`${API_URL}/${id}`, data)
}

export { getAllActivities, updateTask }
