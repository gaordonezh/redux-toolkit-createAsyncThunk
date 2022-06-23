import axios from 'axios';
import { stringify } from 'qs';

const BASE_URL_API = 'https://take-notes-backend-carloscdev.herokuapp.com/api';
const access_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyOWE5NDUxYzM2MzNlNzVmOWFmYTNiMyIsIm5hbWUiOiJBbGRvIiwicG9zaXRpb24iOiJIYXBweSBwZXJzb24iLCJ1c2VybmFtZSI6Imdhb3Jkb25lemhAZ21haWwuY29tIiwiZW1haWwiOiJnYW9yZG9uZXpoQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaXNfYWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTAzVDIzOjA4OjAxLjcwMloiLCJ1cGRhdGVkQXQiOiIyMDIyLTA2LTAzVDIzOjA4OjAxLjcwMloifSwiaWF0IjoxNjU1MTU1MTQ2LCJleHAiOjE2NTc3NDcxNDZ9.QoKCqN0o2NvlKktWYwOkSZvZCuefELep8UsZYt37ABc`;

const server = axios.create({
  baseURL: BASE_URL_API,
  headers: { 'Content-type': 'application/json' },
});

server.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) config.headers.Authorization = access_token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

server.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

server.defaults.paramsSerializer = (params) => stringify(params, { indices: false });
export default server;
