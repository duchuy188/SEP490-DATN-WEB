import { API_CONFIG, STORAGE_KEYS } from '../config/api';
import { ApiResponse, LoginRequest, LoginResponseData } from '../types/auth.types';
import { ApiService } from './api.service';

export class AuthService {
    /**
     * Login user
     */
    static async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponseData>> {
        const response = await ApiService.post<ApiResponse<LoginResponseData>>(
            API_CONFIG.ENDPOINTS.AUTH.LOGIN,
            credentials
        );

        // Store tokens if login successful
        if (response.success && response.data) {
            this.storeTokens(response.data.accessToken, response.data.refreshToken);
        }

        return response;
    }

    /**
     * Logout user
     */
    static logout(): void {
        this.clearTokens();
    }

    /**
     * Store tokens in localStorage
     */
    private static storeTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }

    /**
     * Clear tokens from localStorage
     */
    private static clearTokens(): void {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    /**
     * Get access token
     */
    static getAccessToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }

    /**
     * Get refresh token
     */
    static getRefreshToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    /**
     * Check if user is authenticated
     */
    static isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }
}
