import Player from "./player";
import Game from "./game";

const MAX_PLAYERS = 2;

export default class Room {
    private myPlayers: Player[] = [];
    private myName: string;
    private gameInProgress: boolean = false;
    private game: Game;

    constructor(roomName: string, private io: SocketIO.Server) {
        this.myName = roomName;
    }

    /**
     * Returns a list of all player usernames in this room
     */
    public players(): string[] {
        return this.myPlayers.map((p) => {
            return p.username();
        })
    }

    /**
      *  Returns false if player cannot be added to this room
      *  @param player -- The player to be added.
      */
    public addPlayer(player: Player): boolean {
        if (this.gameInProgress) {
            return false;
        }
        if (this.myPlayers.length < MAX_PLAYERS) {
            this.myPlayers.push(player);
            player.room(this.myName);
            return true;
        }
        return false;
    }

    /**
     *  Returns the name of this room
     */
    public name(): string {
        return this.myName;
    }

    /**
     * If set is omitted returns if this room has a game in progress
     * @param set -- Sets if this room has a game in progress
     */
    public inProgress(set: boolean): void;
    public inProgress(): boolean;
    public inProgress(set?: boolean): void | boolean {
        if (set !== undefined) {
            this.gameInProgress = set;
        } else {
            return this.gameInProgress;
        }
    }

    /**
     * Returns the player which was removed or undefined
     * @param player -- The player to be removed
     */
    public removePlayer(player: Player): Player {
        let i = this.myPlayers.findIndex((p) => {
            return player.sessionKey() === p.sessionKey();
        });
        let p: Player[];
        if (i !== -1) {
            p = this.myPlayers.splice(i, 1);

            if (this.myPlayers.length < 1) {
                this.gameInProgress = false;
            }
            return p[0];
        }
        return undefined;
    }

    /**
     * Returns true if all players in room are ready.
     */
    public ready(): boolean {
        return this.myPlayers.every((p) => {
            return p.ready();
        });
    }

    public startGame(): void {
        this.game = new Game(this.myPlayers, this.io, this.myName);
    }
}