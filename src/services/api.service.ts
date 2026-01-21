import { API_CONFIG, STORAGE_KEYS } from '../config/api';

export class ApiService {
    private static baseUrl = API_CONFIG.BASE_URL;

    /**
     * Generic fetch wrapper with error handling
     */
    static async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        // Get access token from localStorage
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        // Default headers
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        // Add Authorization header if token exists
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const data = await response.json();

            // Handle HTTP errors
            if (!response.ok) {
                throw {
                    status: response.status,
                    ...data,
                };
            }

            return data as T;
        } catch (error) {
            // Re-throw the error for handling in the calling code
            throw error;
        }
    }

    /**
     * GET request
     */
    static async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
        });
    }

    /**
     * POST request
     */
    static async post<T>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    /**
     * PUT request
     */
    static async put<T>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    /**
     * DELETE request
     */
    static async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }

    /**
     * PUT request with FormData (for file uploads)
     */
    static async putFormData<T>(endpoint: string, formData: FormData): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        const headers: Record<string, string> = {};
        // Don't set Content-Type - browser will set it with boundary for FormData

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers,
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw {
                    status: response.status,
                    ...data,
                };
            }

            return data as T;
        } catch (error) {
            throw error;
        }
    }
}
