// Admin API Types

// User item in list
export interface AdminUser {
    id: string;
    email: string;
    full_name: string;
    phone: string | null;
    date_of_birth: string | null;
    role: 'admin' | 'manager' | 'pilgrim' | 'local_guide';
    status: 'active' | 'banned';
    site_id: string | null;
    verified_at: string | null;
    created_at: string;
    updated_at: string;
    avatar_url: string | null;
    language: string;
}

// Pagination info
export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// GET /api/admin/users - Query Parameters
export interface UserListParams {
    page?: number;
    limit?: number;
    role?: 'admin' | 'manager' | 'pilgrim' | 'local_guide' | '';
    status?: 'active' | 'banned' | '';
    search?: string;
}

// GET /api/admin/users - Response Data
export interface UserListData {
    users: AdminUser[];
    pagination: Pagination;
}

// PUT /api/admin/users/{id} - Request Body
export interface UpdateUserData {
    full_name?: string;
    phone?: string;
    date_of_birth?: string;
    role?: 'admin' | 'manager' | 'pilgrim' | 'local_guide';
    site_id?: string | null;
}

// PATCH /api/admin/users/{id}/status - Request Body
export interface UpdateUserStatusData {
    status: 'active' | 'banned';
}

// ============ SITE TYPES ============

// Site regions
export type SiteRegion = 'Bac' | 'Trung' | 'Nam';

// Site types
export type SiteType = 'church' | 'shrine' | 'monastery' | 'center' | 'other';

// Site item in list
export interface AdminSite {
    id: string;
    code: string;
    name: string;
    description: string | null;
    address: string | null;
    province: string | null;
    district: string | null;
    region: SiteRegion;
    type: SiteType;
    patron_saint: string | null;
    cover_image: string | null;
    is_active: boolean;
    created_at: string;
}

// GET /api/admin/sites - Query Parameters
export interface SiteListParams {
    page?: number;
    limit?: number;
    region?: SiteRegion | '';
    type?: SiteType | '';
    is_active?: boolean | '';
    search?: string;
}

// GET /api/admin/sites - Response Data
export interface SiteListData {
    sites: AdminSite[];
    pagination: Pagination;
}
