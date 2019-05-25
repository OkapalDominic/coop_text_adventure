// Use this class to create Players

export default class Player {
    private my_username: string;
    private my_sessionKey: string;
    private health: number;
    private my_score: number;
    private connected: boolean;

    /*
    **  @param {username}: A string representing the players game name
    **  @param {sessionKey}: The session key assigned to this player
    */
    constructor() {
        this.health = 100;
        this.my_score = 0;
    }

    /*
    **  @param {username}: The new username for this player
    **  Returns this player or username if param is omitted
    */
    public username(username: string): Player;
    public username(): string;
    public username(username?: string): Player | string {
        if (username && username.length > 0) {
            this.my_username = username;
            return this;
        }
        return this.my_username;
    }

    /*
    **   @param {sessionKey}: The new sessionKey for this player
    **   Returns this player or sessionKey if param is omitted
    */
    public sessionKey(sessionKey: string): Player;
    public sessionKey(): string;
    public sessionKey(sessionKey?: string): Player | string {
        if (sessionKey && sessionKey.length > 0) {
            this.my_sessionKey = sessionKey;
            return this;
        }
        return this.my_sessionKey;
    }

    /*
    **  Sets this.connected to true
    **  Returns this player
    */
    public connect(): Player {
        this.connected = true;
        return this;
    }

    /*
    **   Sets this.connected to false
    **   Returns this player
    */
    public disconnect(): Player {
        this.connected = false;
        return this;
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
    public score(score: number): Player;
    public score(): number;
    public score(score?: number): Player | number {
        if (score) {
            this.my_score += score;
            return this;
        }
        return this.my_score;
    }

}