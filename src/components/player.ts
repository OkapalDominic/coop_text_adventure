import * as socketIo from 'socket.io';
// Use this class to create Players

export default class Player {
    private myUsername: string;
    private mySessionKey: string;
    private health: number;
    private myScore: number;
    private myLoggedIn: boolean;
    private myRoom: string;
    private myReady: boolean;

    /**
     * 
     * @param socket -- The socket for this player
     */
    constructor(private mySocket: socketIo.Socket) {
        this.health = 100;
        this.myScore = 0;
        this.myReady = false;
    }

    /**
     * When ready is undefined will return if player is ready.
     * Otherwise sets if player is ready and does not return.
     * @param ready -- Set if player is ready to start game
     */
    public ready(ready: boolean): void;
    public ready(): boolean;
    public ready(ready?: boolean): boolean | void {
        if(ready !== undefined) {
            this.myReady = ready;
        } else {
            return this.myReady;
        }
    }

    /**
     * Returns this players socket
     */
    public socket(): socketIo.Socket {
        return this.mySocket;
    }

    /**
     * Returns this Player object if roomName is changed.
     * Returns the name of the room this player is in if no params.
     * @param roomName -- The name of the room this player is assigned to
     */
    public room(roomName: string): Player;
    public room(): string;
    public room(roomName?: string): Player | string {
        if(roomName && roomName.length > 0) {
            this.myRoom = roomName;
            return this;
        }
        return this.myRoom;
    }

    /**
     * Returns this player or username if param is omitted
     * @param username -- The new username for this player
     */
    public username(username: string): Player;  // eslint-disable-line no-dupe-class-members
    public username(): string;  // eslint-disable-line no-dupe-class-members
    public username(username?: string): Player | string {  // eslint-disable-line no-dupe-class-members
        if (username && username.length > 0) {
            this.myUsername = username;
            return this;
        }
        return this.myUsername;
    }

    /*
    **   @param {sessionKey}: The new sessionKey for this player
    **   Returns this player or sessionKey if param is omitted
    */
    public sessionKey(sessionKey: string): Player;  // eslint-disable-line no-dupe-class-members
    public sessionKey(): string;  // eslint-disable-line no-dupe-class-members
    public sessionKey(sessionKey?: string): Player | string {  // eslint-disable-line no-dupe-class-members
        if (sessionKey && sessionKey.length > 0) {
            this.mySessionKey = sessionKey;
            return this;
        }
        return this.mySessionKey;
    }

    /*
    **  @param {connect}: Set if player connected or disconnected
    **  Returns this player or connected if param is omitted
    */
    public loggedIn(connect: boolean): Player;  // eslint-disable-line no-dupe-class-members
    public loggedIn(): boolean;  // eslint-disable-line no-dupe-class-members
    public loggedIn(connect?: boolean): Player | boolean {  // eslint-disable-line no-dupe-class-members
        if (connect != null) {
            this.myLoggedIn = connect;
            return this;
        }
        return this.myLoggedIn;
    }

    /*
    **  @param {dmg}: The amount of damage dealt to player
    **  Returns this player
    */
    public damagePlayer(dmg: number): Player {
        this.health -= dmg;
        if (this.health < 0) {
            this.health = 0;
        }
        return this;
    }

    /*
    **  Returns player health
    */
    public getHealth(): number {
        return this.health;
    }

    /*
    **  @param {score}: The amount to increase score by
    **  Returns this player or players score if param is omitted
    */
    public score(score: number): Player;  // eslint-disable-line no-dupe-class-members
    public score(): number;  // eslint-disable-line no-dupe-class-members
    public score(score?: number): Player | number {  // eslint-disable-line no-dupe-class-members
        if (score) {
            this.myScore += score;
            return this;
        }
        return this.myScore;
    }

}