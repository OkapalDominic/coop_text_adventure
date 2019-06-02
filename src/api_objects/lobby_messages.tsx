export interface LeftRoom {
    username: string;
}

export interface ReadyToPlay {
    username: string;
    ready: boolean;
}

export interface GameSetup {
    message: string;
    inventory: string[];
    items: string[];
}