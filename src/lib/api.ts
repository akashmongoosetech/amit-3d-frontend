const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiError {
  success: false;
  message: string;
  statusCode: number;
}

class ApiClientError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
  }
}

function getToken(): string | null {
  try {
    const raw = localStorage.getItem("verto3d_admin_session");
    if (!raw) return null;
    return JSON.parse(raw).token || null;
  } catch {
    return null;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new ApiClientError(json.message || "Request failed", res.status);
  }

  return json.data as T;
}

async function requestFormData<T>(
  endpoint: string,
  formData: FormData,
  headers: Record<string, string> = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers,
    body: formData,
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new ApiClientError(json.message || "Request failed", res.status);
  }

  return json.data as T;
}

function get<T>(endpoint: string, params?: Record<string, string>) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  return request<T>(`${endpoint}${query}`, { method: "GET" });
}

function post<T>(endpoint: string, body?: unknown) {
  return request<T>(endpoint, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

function put<T>(endpoint: string, body?: unknown) {
  return request<T>(endpoint, {
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  });
}

function del<T>(endpoint: string) {
  return request<T>(endpoint, { method: "DELETE" });
}

function patch<T>(endpoint: string, body?: unknown) {
  return request<T>(endpoint, {
    method: "PATCH",
    body: body ? JSON.stringify(body) : undefined,
  });
}

function postFormData<T>(endpoint: string, formData: FormData) {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return requestFormData<T>(endpoint, formData, headers);
}

export const api = { get, post, put, patch, del, postFormData };
export { ApiClientError };
export type { ApiError };
