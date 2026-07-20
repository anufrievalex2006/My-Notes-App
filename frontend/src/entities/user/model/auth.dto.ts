export interface TokenResponse {
    token: string;
}

export interface RegisterDto {
    username: string;
    password: string;
    avatarUrl?: string | null;
}

export interface LoginDto {
    username: string;
    password: string;
}