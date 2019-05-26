// Use this class to create Players

export default class Player {
    private myUsername: string;
    private mySessionKey: string;
    private health: number;
    private myScore: number;
    private myConnected: boolean;

    /*
    **  @param {username}: A string representing the players game name
    **  @param {sessionKey}: The session key assigned to this player
    */
    constructor() {
        this.health = 100;
        this.myScore = 0;
    }

    /*
    **  @param {username}: The new username for this player
    **  Returns this player or username if param is omitted
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
    public connected(connect: boolean): Player;  // eslint-disable-line no-dupe-class-members
    public connected(): boolean;  // eslint-disable-line no-dupe-class-members
    public connected(connect?: boolean): Player | boolean {  // eslint-disable-line no-dupe-class-members
        if (connect != null) {
            this.myConnected = connect;
            return this;
        }
        return this.myConnected;
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