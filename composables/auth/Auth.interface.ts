export interface AuthToken { 
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
}

export interface Identity {
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
}

export interface AuthState extends AuthToken {
    isRefreshing: boolean;
    isRefreshSuccess: boolean;
    identity: Identity;
}