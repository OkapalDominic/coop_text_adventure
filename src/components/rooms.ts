import Room from "./room";
import Player from "./player";

export default class Rooms {
    private myRooms: Room[] = [];
    private nextRoom: number = 0;

    /**
     * Returns the room the player was added to
     * @param player -- The player to add to a room
     */
    public add(player: Player, io: SocketIO.Server): Room {
        let roomAddedTo: number = -1;
        if (
            !this.myRooms.some((room, i) => {
                roomAddedTo = i;
                return room.addPlayer(player);
            })
        ) {
            let room: Room = new Room(this.nextRoom.toString(), io);
            this.nextRoom++;
            room.addPlayer(player);
            this.myRooms.push(room);
            roomAddedTo = this.myRooms.length - 1;
        }

        return this.myRooms[roomAddedTo];
    }

    /**
     * Returns the player which was removed, or undefined
     * if unable to find the player in a room
     * @param player -- The player to remove from their room
     */
    public remove(player: Player): Player {
        let roomPlayer: Player;
        this.myRooms.some((room) => {
            roomPlayer = room.removePlayer(player);
            return roomPlayer !== undefined;
        });
        return roomPlayer;
    }

    public getRoom(roomName: string): Room {
        return this.myRooms.find((r) => {
            return r.name() === roomName;
        });
    }
}