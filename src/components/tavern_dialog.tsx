import React from "react";
import { WaitingTexts } from './tavern_waiting_texts';

export default class TavernDialog {
    private initialPlayers: number;
    private numPlayers: number;
    private time: number;
    private showSecondPlayerMsg: boolean = true;

    constructor(private players: string[], private room: string, private cbReady: () => void) {
        this.numPlayers = this.players[1].length > 0 ? 2 : 1;
        this.initialPlayers = this.numPlayers;
        this.time = 0;

        this.next = this.next.bind(this);
    }

    public setup(): JSX.Element {
        console.log('setup');
        if (this.numPlayers === 1) {
            return (<div key={this.time}>
                <p>As you walk into town, you are directed toward a tavern.</p>
                <p>Cautiously, you enter the tavern and look around.</p>
                <p>The bartender greets you:</p>
                <p>"Welcome {this.players[0]}, have a seat over there."</p>
                <p>Unsure how he knows your name, you reluctantly walk toward the table he pointed at.</p>
            </div>);
        }
        return (<div key={this.time}>
            <p>As you walk into town you see someone enter a tavern. Unsure of where to go yourself, you follow</p>
            <p>As you enter the tavern the bartender greets you:</p>
            <p>"Hmm, oh... {this.players[0]} you must be here for the reward, have a seat with {this.players[1]} over there."</p>
            <p>He points you toward the table with the person you saw walk into the tavern just before you.</p>
        </div>)
    }

    public updatePlayers(players: string[]): void {
        this.players = players;
        this.numPlayers = this.players[1].length > 0 ? 2 : 1;
    }

    public next(): [JSX.Element, boolean] {
        let ret: JSX.Element = <span></span>;
        let addToState: boolean = false;

        if (this.numPlayers === 1) {
            ret = this.onePlayer();
            addToState = true;
        } else if (this.showSecondPlayerMsg) {
            ret = this.twoPlayers();
            addToState = true;
            this.showSecondPlayerMsg = false;
        }
        this.time += 1;
        return [<div key={this.time}>{ret}</div>, addToState];
    }

    private onePlayer(): JSX.Element {
        if (this.time === 0) {
            return (<div>
                <p>You sit down at the table hoping to see a friendly face.</p>
                <p>You see a dead fireplace.</p>
            </div>);
        }
        return WaitingTexts[Math.floor(Math.random() * WaitingTexts.length)];
    }

    private twoPlayers(): JSX.Element {
        if(this.initialPlayers === 1) {
            return (<div>
                <p>As you look around, someone else sits down. They introduce themselves as {this.players[1]} and ask if you're ready.</p>
                <button type="button" onClick={this.cbReady}>I'm ready.</button>
            </div>);
        }
        return (<div>
            <p>Eventually you decide to join {this.players[1]} and introduce yourself. You ask if they're ready to go, and consider if you are ready yourself.</p>
            <button type="button" onClick={this.cbReady}>I'm ready.</button>
        </div>);
    }
}