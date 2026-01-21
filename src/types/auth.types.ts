// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: {
        message: string;
        details?: unknown[];
    };
}

// Login Request
export interface LoginRequest {
    email: string;
    password: string;
}

// Login Response Data
export interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
}

// API Error
export interface ApiError {
    success: false;
    error: {
        message: string;
        details?: unknown[];
    };
}
