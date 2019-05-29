export interface LoginRequest {
    username: string;
    sessionKey: string;
}

export class LoginResponse {
    success: boolean;
    room: string;
    players: string[];
}

export class Connected {
    sessionKey: string;

    constructor(sessionKey: string) {
        this.sessionKey = sessionKey;
    }
}