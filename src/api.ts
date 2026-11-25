import axios from 'axios';
export const api = axios.create({ baseURL: 'https://campuscultura-api.aaron-navarro.workers.dev/api' });

export interface Dashboard {
  item: {
    name: string;
    discipline: string;
    date: string;
    vacancies: number;
  };
  linkToDetail?: boolean;
}

export interface ActivityDetails {
    id: string;
    name: string;
    description: string;
    date: string;


    vacancies: number;
}



export interface Page<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}


api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && !config.url?.includes('/auth/')) {

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});




api.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && !error.config?.url?.includes('/auth/')) {
      
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export function apiError(err: unknown) {
  if (axios.isAxiosError<{ code: string; message: string }>(err) && err.response) {
    return {
      code: err.response.data?.code,
      message: err.response.data?.message ?? 'Ocurrió un error.',
    };}
  return { code: undefined, message: 'No se pudo conectar con el servidor.' };

}
