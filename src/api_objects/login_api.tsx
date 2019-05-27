export class LoginRequest {
    username: string = '';
    sessionKey?: string;
}

export interface LoginResponse {
    success: boolean;
    sessionKey: string;
    username: string;
}
