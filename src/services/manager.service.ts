import { API_CONFIG } from '../config/api';
import { ApiResponse } from '../types/auth.types';
import {
    ManagerSite,
    CreateManagerSiteData,
    UpdateManagerSiteData
} from '../types/manager.types';
import { ApiService } from './api.service';

/**
 * Manager Service - APIs for Manager role
 */
export class ManagerService {
    // ============ SITE METHODS ============

    /**
     * Get manager's site
     * Manager can only have 1 site
     */
    static async getMySite(): Promise<ApiResponse<ManagerSite>> {
        return ApiService.get<ApiResponse<ManagerSite>>(API_CONFIG.ENDPOINTS.MANAGER.SITES);
    }

    /**
     * Create new site (Manager only - max 1 site)
     * Uses FormData for file upload
     */
    static async createSite(data: CreateManagerSiteData): Promise<ApiResponse<ManagerSite>> {
        const formData = new FormData();

        // Required fields
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('province', data.province);
        formData.append('latitude', data.latitude.toString());
        formData.append('longitude', data.longitude.toString());
        formData.append('region', data.region);
        formData.append('type', data.type);

        // Optional fields
        if (data.description) {
            formData.append('description', data.description);
        }
        if (data.history) {
            formData.append('history', data.history);
        }
        if (data.district) {
            formData.append('district', data.district);
        }
        if (data.patron_saint) {
            formData.append('patron_saint', data.patron_saint);
        }
        if (data.cover_image) {
            formData.append('cover_image', data.cover_image);
        }
        if (data.opening_hours) {
            formData.append('opening_hours', JSON.stringify(data.opening_hours));
        }
        if (data.contact_info) {
            formData.append('contact_info', JSON.stringify(data.contact_info));
        }

        return ApiService.postFormData<ApiResponse<ManagerSite>>(
            API_CONFIG.ENDPOINTS.MANAGER.SITES,
            formData
        );
    }

    /**
     * Update manager's site
     * Uses FormData for file upload
     */
    static async updateSite(data: UpdateManagerSiteData): Promise<ApiResponse<ManagerSite>> {
        const formData = new FormData();

        // Only append fields that are provided
        if (data.name !== undefined) {
            formData.append('name', data.name);
        }
        if (data.description !== undefined) {
            formData.append('description', data.description);
        }
        if (data.history !== undefined) {
            formData.append('history', data.history);
        }
        if (data.address !== undefined) {
            formData.append('address', data.address);
        }
        if (data.province !== undefined) {
            formData.append('province', data.province);
        }
        if (data.district !== undefined) {
            formData.append('district', data.district);
        }
        if (data.latitude !== undefined) {
            formData.append('latitude', data.latitude.toString());
        }
        if (data.longitude !== undefined) {
            formData.append('longitude', data.longitude.toString());
        }
        if (data.region !== undefined) {
            formData.append('region', data.region);
        }
        if (data.type !== undefined) {
            formData.append('type', data.type);
        }
        if (data.patron_saint !== undefined) {
            formData.append('patron_saint', data.patron_saint);
        }
        if (data.cover_image !== undefined) {
            if (data.cover_image) {
                formData.append('cover_image', data.cover_image);
            }
        }
        if (data.opening_hours !== undefined) {
            formData.append('opening_hours', JSON.stringify(data.opening_hours));
        }
        if (data.contact_info !== undefined) {
            formData.append('contact_info', JSON.stringify(data.contact_info));
        }

        return ApiService.putFormData<ApiResponse<ManagerSite>>(
            API_CONFIG.ENDPOINTS.MANAGER.SITES,
            formData
        );
    }
}
