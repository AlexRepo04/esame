import type { AuthResponse, ContactFormData, Contact, GenericResponse, ProductFormData, Product } from '../types'

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
    // Simula il comportamento di Axios lanciando un errore con i dati del backend
    throw { response: { data } }
  }

  return data
}

// ============================================================
//  API AUTH
// ============================================================
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

// ============================================================
//  API CONTATTI
// ============================================================
export const contactAPI = {
  submit: (data: ContactFormData) =>
    apiRequest<GenericResponse>('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  getAll: () => apiRequest<Contact[]>('/api/contacts'),
}

// ============================================================
//  API PRODOTTI
// ============================================================
export const productAPI = {
  create: (data: ProductFormData) =>
    apiRequest<GenericResponse>('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  getAll: () => apiRequest<Product[]>('/api/products'),

  delete: (id: number) =>
    apiRequest<GenericResponse>(`/api/products/${id}`, {
      method: 'DELETE',
    }),
}
