export interface LoginRequest {
    username: string;
    sessionKey?: string;
}

export class LoginResponse {
    success: boolean;
    sessionKey: string;
}
