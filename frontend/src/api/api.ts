import type { AuthResponse, ContactFormData, Contact, GenericResponse, SpaceFormData, Space } from '../types'

const API_BASE_URL = 'http://localhost:8080'

// Funzione di supporto per le chiamate API con fetch
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token')

  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw { response: { data } }
  }

  return data
}

export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  login: (data: { username: string; password: string }) =>
    apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

export const contactAPI = {
  submit: (data: ContactFormData) =>
    apiRequest<GenericResponse>('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  getAll: () => apiRequest<Contact[]>('/api/contacts'),
}

export const spaceAPI = {
  create: (data: SpaceFormData) =>
    apiRequest<GenericResponse>('/api/spaces', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  getAll: () => apiRequest<Space[]>('/api/spaces'),

  delete: (id: number) =>
    apiRequest<GenericResponse>(`/api/spaces/${id}`, {
      method: 'DELETE',
    }),
}
