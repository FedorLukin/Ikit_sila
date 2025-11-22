import axios from "axios";
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
})

//Request Interceptors

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//Response Interceptors || обработает ошибку и после запроса, и если она возникла еще на этапе интерсептора запроса, не выполнив при этом сам запрос!

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
    }

    return Promise.reject(error) // Если здесь не вернуть ошибку, она будет "поглощена" и не попадет в блок catch в компаненте!
  }
)

export default api
