export interface User {
  username: string
  email: string
}

export interface AuthResponse {
  token: string
  username: string
  email: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface Contact extends ContactFormData {
  id: number
  createdAt: string
}

export interface GenericResponse {
  message: string
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
}