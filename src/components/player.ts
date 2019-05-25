

export class Player {
    private health: number;
    private score: number;

    constructor(private username: string, private sessionKey: string) {
        this.health = 100;
        this.score = 0;
    }

    /*
    **  @param {dmg}: The amount of damage dealt to player
    **  Returns the current health after taking damage.
    */
    public damagePlayer(dmg: number): number {
        this.health -= dmg;
        if(this.health < 0) {
            this.health = 0;
        }
        return this.health;
    }

    /*
    **  @param {score}: The amount to increase score by
    **  Returns the total score.
    */
    public increaseScore(score: number): number {
        this.score += score;
        return this.score;
    }
}