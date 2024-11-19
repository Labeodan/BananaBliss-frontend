import axios from 'axios'
import { getToken } from '../utils/token'
// Create a new instance of the axios client, that we can configure to our liking
const axiosAuth = axios.create()

// On our authenticated instance, we will create an interceptor that will dynamically attach a authorization header before every request is sent
// The callback function we pass in the use() method is the function that will be called before every request we send using this instance
axiosAuth.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config // always return the modified (or unmodified) config at the end of the function
})
export default axiosAuth