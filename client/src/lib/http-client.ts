import { ELang } from '@/types/share';
import axios from 'axios';

const http_client = axios.create({
   baseURL: 'http://localhost:8080/api',
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

http_client.interceptors.request.use(
   function (config) {
      const lang = localStorage.getItem('lang') || ELang.EN;

      config.headers['Accept-Language'] = lang;
      config.headers['lang'] = lang;

      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

http_client.interceptors.response.use(
   function (response) {
      return response.data;
   },
   function (error) {
      return Promise.reject(error);
   }
);

export default http_client;
