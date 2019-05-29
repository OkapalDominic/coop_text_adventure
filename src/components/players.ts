// Keeps track of all players
// Adds and removes them
import * as socketIo from 'socket.io';
import Player from './player';


const disconnectTimeout = 3000;

export default class Players {
    private players: Player[] = [];

    public create(session: string, socket: socketIo.Socket): Player {
        let player: Player = new Player(socket);
        this.players.push(player);
        player.sessionKey(session);
        return player;
    }

    /*
    **  @param {player}: The player which disconnected
    **  After timeout will remove player if they don't reconnect.
    */
    public disconnected(player: Player, cb: (disconnected: boolean, player: Player, t: any) => void, t: any): void {
        let pindex: number = this.getPlayerBySession(player.sessionKey());
        if (pindex !== -1) {
            this.players[pindex].loggedIn(false);
            this.disconnectTimeout().then(() => {
                pindex = this.getPlayerBySession(player.sessionKey());
                if (!this.players[pindex].loggedIn()) {
                    // If not connected, then remove.
                    this.players.splice(pindex, 1);
                    console.log('player disconnected');
                    cb(true, player, t);
                }
            });
        }
        cb(false, player, t);
    }

    /*
    **  @param {player}: The player trying to login.
    **  @param {username}: The username they want to use.
    **  Returns a tuple [boolean, Player]
    **  boolean is false if username matches a different player's username
    **  and Player is the player object after modification
    */
    public add(player: Player, username: string): [boolean, Player] {
        let success = true;
        let sindex: number = this.getPlayerBySession(player.sessionKey());

        if (sindex !== -1) {
            let old: Player = this.players[sindex];
            if (player !== old) {
                // We have a reconnection
                player = old;
                player.loggedIn(true);
            }
        } else {
            // We have a new player
            this.players.push(player);
        }

        if (this.usernameValid(username)) {
            // username is valid
            player.username(username);
        } else {
            // username not valid
            if (this.players[this.getPlayerByUsername(username)] !== player) {
                // if that player is not this player, login fail.  Otherwise no change is needed.
                success = false;
            }
        }
        return [success, player];
    }

    public getUsername(sessionKey: string): string {
        let i = this.getPlayerBySession(sessionKey);
        if(i === -1 ) {
            return undefined;
        }
        return this.players[i].username();
    }

    private usernameValid(username: string): boolean {
        return this.getPlayerByUsername(username) === -1 && username.length > 0;
    }

    private getPlayerByUsername(username: string): number {
        return this.players.findIndex((player) => {
            return player.username() === username;
        });
    }

    private getPlayerBySession(sessionKey: string): number {
        return this.players.findIndex((player) => {
            return player.sessionKey() === sessionKey;
        });
    }

    private async disconnectTimeout(): Promise<null> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), disconnectTimeout);
        });
    }
}