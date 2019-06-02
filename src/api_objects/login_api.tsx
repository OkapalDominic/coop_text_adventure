export class LoginRequest {
    username: string = '';
    sessionKey: string = '';
}

export interface LoginResponse {
    success: boolean;
    room: string;
    players: string[];
}

export interface Connected {
    sessionKey: string;
}