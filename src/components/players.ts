// Keeps track of all players
// Adds and removes them

import Player from './player';


const disconnectTimeout: number = 3000;

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
            this.disconnectTimeout().then(result => {
                pindex = this.getPlayerBySession(player.sessionKey());
                if(!this.players[pindex].connected()) {
                    // If not connected, then remove.
                    this.players.splice(pindex, 1);
                }
            });
        }
    }

    /*
    **  @param {player}: The player trying to login.
    **  @param {username}: The username they want to use.
    **  Returns false if username matches a different player's username
    */
    public add(player: Player, username: string): boolean {
        let success = true;
        let pindex: number = this.getPlayerByUsername(username);
        if (pindex === -1) {
            // No player with that username, so set it
            player.username(username);
            pindex = this.getPlayerBySession(player.sessionKey());
            if (pindex === -1) {
                // No player with that session, so push new player
                this.players.push(player);
            }
        } else {
            // player pindex has that username
            if (this.players[pindex].sessionKey() !== player.sessionKey()) {
                // duplicate username error
                success = false;
            }
        }

        return success;
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

    private async disconnectTimeout(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), disconnectTimeout)
        });
    }
}