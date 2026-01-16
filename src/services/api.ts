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
    uploadFile: async (file: File, type: 'image' | 'pdf'): Promise<{ url: string; publicId: string }> => {
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
