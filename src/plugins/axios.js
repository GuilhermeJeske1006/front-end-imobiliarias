import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_ROOT_API;


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default axios;
