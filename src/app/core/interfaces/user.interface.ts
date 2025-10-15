/**
 * Interfaz de Usuario
 */
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  role: Role;
}

/**
 * Interfaz de Rol
 */
export interface Role {
  id: string;
  name: string;
  display_name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Datos para registro de usuario
 */
export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

/**
 * Datos para login
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Respuesta de autenticación
 */
export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

