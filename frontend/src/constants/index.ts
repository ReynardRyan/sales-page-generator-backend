export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'AI Sales Page Generator';

export const QUERY_KEYS = {
  salesPages: ['salesPages'] as const,
  salesPage: (id: number) => ['salesPages', id] as const,
  user: ['user'] as const,
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CREATE: '/sales-pages/create',
  PREVIEW: (id: number | string) => `/sales-pages/${id}`,
  EDIT: (id: number | string) => `/sales-pages/${id}/edit`,
  HISTORY: '/history',
} as const;
