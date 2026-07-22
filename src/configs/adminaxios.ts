import { Config } from './mainconfig';

const BASE_URL = (Config.API_URL || '').replace(/\/+$/, '');

// Shared default headers — replaces axios.defaults.headers.common
const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};

export function setDefaultHeader(key: string, value: string) {
  defaultHeaders[key] = value;
}

export function removeDefaultHeader(key: string) {
  delete defaultHeaders[key];
}

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
};

async function request<T = unknown>(path: string, options: FetchOptions = {}): Promise<{ data: T; status: number }> {
  const url = `${BASE_URL}/${path.replace(/^\/+/, '')}`;

  const res = await fetch(url, {
    method: options.method ?? 'GET',
    headers: { ...defaultHeaders, ...(options.headers ?? {}) },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  let data: T;
  try {
    data = await res.json();
  } catch {
    data = null as T;
  }

  if (!res.ok) {
    return Promise.reject((data as any) || `Something went wrong (HTTP ${res.status})`);
  }

  return { data, status: res.status };
}

const apiFetch = {
  get: <T = unknown>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'GET', headers }),

  post: <T = unknown>(path: string, body?: unknown, options?: { headers?: Record<string, string> }) =>
    request<T>(path, { method: 'POST', body, headers: options?.headers }),

  put: <T = unknown>(path: string, body?: unknown, options?: { headers?: Record<string, string> }) =>
    request<T>(path, { method: 'PUT', body, headers: options?.headers }),

  delete: <T = unknown>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'DELETE', headers }),
};

export default apiFetch;
