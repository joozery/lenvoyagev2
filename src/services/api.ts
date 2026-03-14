import apiClient from '@/lib/api-client';

// ==================== Auth APIs ====================

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
    };
    token: string;
}

export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await apiClient.post('/api/auth/login', credentials);
        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('admin_token', response.data.token);
        }
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/api/auth/logout');
        localStorage.removeItem('admin_token');
    },
};

// ==================== Upload API ====================

export const uploadAPI = {
    // Direct upload to Cloudinary (bypasses Next.js body size limit)
    uploadFile: async (file: File, type: 'image' | 'pdf' | 'video' = 'image'): Promise<{ url: string; publicId: string }> => {
        // Special case for PDF: Save to local server to bypass Cloudinary 10MB raw file limit
        if (type === 'pdf') {
            console.log('PDF detected, using Cloudflare R2 storage to bypass Cloudinary 10MB limit');
            return uploadAPI.uploadFileViaAPI(file, 'pdf');
        }

        try {
            // Get upload signature from our API
            const signatureResponse = await apiClient.post('/api/upload-signature', {
                folder: 'lensvoyage',
                resourceType: type === 'video' ? 'video' : 'image',
            });

            const { timestamp, signature, apiKey, cloudName, folder, resourceType } = signatureResponse.data;

            // Prepare form data for direct Cloudinary upload
            // Order matters: append in the same order as signature generation (alphabetically)
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('api_key', apiKey);
            uploadFormData.append('timestamp', timestamp.toString());
            uploadFormData.append('signature', signature);
            uploadFormData.append('access_mode', 'public'); // Alphabetical order
            uploadFormData.append('folder', folder);
            uploadFormData.append('resource_type', resourceType);
            // Upload directly to Cloudinary
            // Cloudinary API endpoint format: /v1_1/{cloud_name}/{resource_type}/upload
            const uploadEndpoint = resourceType === 'video' ? 'video' : 'image';
            const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${uploadEndpoint}/upload`;

            const uploadResponse = await fetch(uploadUrl, {
                method: 'POST',
                body: uploadFormData,
            });

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                let errorMessage = `Cloudinary upload failed: ${uploadResponse.status}`;
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.error?.message || errorData.error || errorText;
                } catch {
                    errorMessage = errorText || errorMessage;
                }
                console.error('Cloudinary upload error:', {
                    status: uploadResponse.status,
                    statusText: uploadResponse.statusText,
                    error: errorText,
                    url: uploadUrl,
                    resourceType,
                    type
                });
                throw new Error(errorMessage);
            }

            const uploadData = await uploadResponse.json();

            // For videos, Cloudinary might return different response structure
            const url = uploadData.secure_url || uploadData.url;
            const publicId = uploadData.public_id;

            if (!url || !publicId) {
                throw new Error('Invalid response from Cloudinary: missing URL or public_id');
            }

            return {
                url,
                publicId,
            };
        } catch (error: any) {
            console.error('Direct upload error:', {
                type,
                error: error.message || error,
                stack: error.stack
            });
            throw error;
        }
    },

    // Fallback: Upload via Next.js API (for smaller files)
    uploadFileViaAPI: async (file: File, type: 'image' | 'pdf'): Promise<{ url: string; publicId: string }> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        const response = await apiClient.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },
};

// ==================== Tours APIs ====================

export interface Tour {
    _id?: string;
    name: string;
    location: string;
    price: number;
    duration: string;
    tourDate: string;
    startDate?: string;
    endDate?: string;
    seatsAvailable: number;
    status: 'เปิดขาย' | 'เร็วๆนี้' | 'ร่าง';
    image: {
        url: string;
        publicId: string;
    };
    pdf?: {
        url: string;
        publicId: string;
    };
    tripDetails?: string;
    dailyItinerary?: string;
}

export const toursAPI = {
    getAll: async (): Promise<Tour[]> => {
        const response = await apiClient.get('/api/tours');
        return response.data.data;
    },

    getById: async (id: string): Promise<Tour> => {
        const response = await apiClient.get(`/api/tours/${id}`);
        return response.data.data;
    },

    create: async (tour: Partial<Tour>): Promise<Tour> => {
        const response = await apiClient.post('/api/tours', tour);
        return response.data.data;
    },

    update: async (id: string, tour: Partial<Tour>): Promise<Tour> => {
        const response = await apiClient.put(`/api/tours/${id}`, tour);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/tours/${id}`);
    },
};

// ==================== Partners APIs ====================

export interface Partner {
    _id?: string;
    name: string;
    website: string;
    logo: {
        url: string;
        publicId: string;
    };
    isVisible: boolean;
    order: number;
}

export const partnersAPI = {
    getAll: async (): Promise<Partner[]> => {
        const response = await apiClient.get('/api/partners');
        return response.data.data;
    },

    getById: async (id: string): Promise<Partner> => {
        const response = await apiClient.get(`/api/partners/${id}`);
        return response.data.data;
    },

    create: async (partner: Partial<Partner>): Promise<Partner> => {
        const response = await apiClient.post('/api/partners', partner);
        return response.data.data;
    },

    update: async (id: string, partner: Partial<Partner>): Promise<Partner> => {
        const response = await apiClient.put(`/api/partners/${id}`, partner);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/partners/${id}`);
    },
};

// ==================== Admins APIs ====================

export interface AdminUser {
    _id?: string;
    username: string;
    email: string;
    role: 'admin' | 'super-admin';
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export const adminsAPI = {
    getAll: async (): Promise<AdminUser[]> => {
        const response = await apiClient.get('/api/admins');
        return response.data.data;
    },

    getById: async (id: string): Promise<AdminUser> => {
        const response = await apiClient.get(`/api/admins/${id}`);
        return response.data.data;
    },

    create: async (admin: { username: string; email: string; password: string; role?: string }): Promise<AdminUser> => {
        const response = await apiClient.post('/api/admins', admin);
        return response.data.data;
    },

    update: async (id: string, admin: Partial<AdminUser> & { password?: string }): Promise<AdminUser> => {
        const response = await apiClient.put(`/api/admins/${id}`, admin);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/admins/${id}`);
    },
};

// ==================== Gallery APIs ====================

export interface GalleryItem {
    _id?: string;
    title?: string;
    description?: string;
    imageUrl: string;
    publicId: string;
    type: 'image' | 'video';
    category?: string;
    isVisible: boolean;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export const galleryAPI = {
    getAll: async (type?: 'image' | 'video', includeInvisible?: boolean): Promise<GalleryItem[]> => {
        const params = new URLSearchParams();
        if (type) params.set('type', type);
        if (includeInvisible) params.set('includeInvisible', 'true');
        const query = params.toString();
        const response = await apiClient.get(`/api/gallery${query ? `?${query}` : ''}`);
        return response.data.data;
    },

    getById: async (id: string): Promise<GalleryItem> => {
        const response = await apiClient.get(`/api/gallery/${id}`);
        return response.data.data;
    },

    create: async (item: Partial<GalleryItem>): Promise<GalleryItem> => {
        const response = await apiClient.post('/api/gallery', item);
        return response.data.data;
    },

    update: async (id: string, item: Partial<GalleryItem>): Promise<GalleryItem> => {
        const response = await apiClient.put(`/api/gallery/${id}`, item);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/gallery/${id}`);
    },
};

// ==================== Teams APIs ====================

export interface TeamMember {
    _id?: string;
    name: string;
    role: string;
    bio?: string;
    avatar?: {
        url: string;
        publicId: string;
    };
    email?: string;
    socialLinks?: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
        linkedin?: string;
    };
    order: number;
    isVisible: boolean;
}

export const teamsAPI = {
    getAll: async (includeInvisible: boolean = false): Promise<TeamMember[]> => {
        const params = new URLSearchParams();
        if (includeInvisible) params.set('includeInvisible', 'true');
        const query = params.toString();
        const response = await apiClient.get(`/api/teams${query ? `?${query}` : ''}`);
        return response.data.data;
    },

    getById: async (id: string): Promise<TeamMember> => {
        const response = await apiClient.get(`/api/teams/${id}`);
        return response.data.data;
    },

    create: async (member: Partial<TeamMember>): Promise<TeamMember> => {
        const response = await apiClient.post('/api/teams', member);
        return response.data.data;
    },

    update: async (id: string, member: Partial<TeamMember>): Promise<TeamMember> => {
        const response = await apiClient.put(`/api/teams/${id}`, member);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/teams/${id}`);
    },
};
