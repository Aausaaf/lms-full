import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

instance.interceptors.request.use(config => {
  // Add or modify the headers of the request
  config.headers['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('UserToken'));
   config.headers['Content-Type'] = 'multipart/form-data'
  return config;
});

instance.interceptors.response.use(response => {
  // Add or modify the response data
  response.data.modified = true;

  return response;
});

export default instance
