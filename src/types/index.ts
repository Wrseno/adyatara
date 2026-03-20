import type { Role } from "@/generated/prisma/client";

export interface UserProfile {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: Role;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
