const APP_PREFIX = 'interviews_app__';
const DEFAULT_TTL = 24 * 60 * 60 * 1000;
const STORAGE_KEYS = {
  USER: 'user',
  SESSION: 'session'
} as const;
const LIFETIME = 3000;

// for API
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string;
const API_BASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

export {
  APP_PREFIX,
  DEFAULT_TTL,
  STORAGE_KEYS,
  LIFETIME,
  ACCESS_TOKEN,
  API_BASE_URL,
}

