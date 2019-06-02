import Player from "./player";
import { GameSetup } from "../api_objects/game_messages";

export default class Game {

    constructor(private players: Player[], private io: SocketIO.Server, private name: string) {
        let gameSetup: GameSetup = new GameSetup();
        gameSetup.message = 'A new game dawns.';
        gameSetup.inventory = ['Knife', 'Bandaid', 'Pants'];
        gameSetup.items = ['Door', 'Table', 'Strange looking person in mirror'];
        io.to(name).emit('gameSetup', gameSetup);

        this.setupListeners();
    }

    private setupListeners(): void {
        this.players.forEach((p) => {
            // Add listeners here...

            p.socket().on('message', (req) => {
                console.log('Received message from ' + p.username());
            });

            
        });
    }
}