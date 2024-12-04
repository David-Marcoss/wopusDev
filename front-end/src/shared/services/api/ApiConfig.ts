import axios from "axios";
import Cookies from "js-cookie"; // Certifique-se de instalar js-cookie: npm install js-cookie
import { signOut } from "next-auth/react";

export const api = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
  });

  // Adiciona o cookie em todas as requisições
  instance.interceptors.request.use(
    (config) => {
      const authToken = Cookies.get("authToken"); // Substitua pelo nome correto do cookie
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Adiciona o interceptor de resposta para lidar com erros de autenticação
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        Cookies.remove("authToken");
        await signOut({ callbackUrl: "/login" });
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
