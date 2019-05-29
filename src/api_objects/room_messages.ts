export class LeftRoom {
    username: string;

    constructor(username: string) {
        this.username = username;
    }
}

export class ReadyToPlay {
    username: string;
    ready: boolean;

    constructor(username: string, ready: boolean) {
        this.username = username;
        this.ready = ready;
    }
}