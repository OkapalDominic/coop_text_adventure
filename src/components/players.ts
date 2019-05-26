// Keeps track of all players
// Adds and removes them

import Player from './player';


const disconnectTimeout = 3000;

export default class Players {
    private players: Player[] = [];

    /*
    **  @param {player}: The player which disconnected
    **  After timeout will remove player if they don't reconnect.
    */
    public disconnected(player: Player): void {
        let pindex: number = this.getPlayerBySession(player.sessionKey());
        if (pindex !== -1) {
            this.players[pindex].connected(false);
            this.disconnectTimeout().then(() => {
                pindex = this.getPlayerBySession(player.sessionKey());
                if (!this.players[pindex].connected()) {
                    // If not connected, then remove.
                    this.players.splice(pindex, 1);
                }
            });
        }
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
                player.connected(true);
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