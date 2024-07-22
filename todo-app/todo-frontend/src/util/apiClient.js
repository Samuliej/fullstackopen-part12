import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL

const apiClient = axios.create({
  baseURL: url,
})

export default apiClient