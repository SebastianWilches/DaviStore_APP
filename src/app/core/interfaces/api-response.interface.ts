/**
 * Estructura de respuesta estándar del backend
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    message?: string;
    pagination?: PaginationMeta;
  };
}

/**
 * Estructura de error del backend
 */
export interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
    details?: any;
  };
}

/**
 * Metadatos de paginación
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Parámetros para solicitudes paginadas
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

