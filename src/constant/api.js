import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bestdeveloping.com/pomona/api.php',
});

export default api