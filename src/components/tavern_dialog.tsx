import React from "react";
import { WaitingTexts } from './tavern_waiting_texts';

export default class TavernDialog {
    private time: number;

    constructor(private username: string) {
        this.time = 0;

        this.next = this.next.bind(this);
    }

    public setup(): JSX.Element {
        return (<div key={this.time}>
            <p>As you walk into town, you are directed toward a tavern.</p>
            <p>Cautiously, you enter the tavern and look around.</p>
            <p>The bartender greets you:</p>
            <p>"Welcome {this.username}, have a seat over there."</p>
            <p>Unsure how he knows your name, you reluctantly walk toward the table he pointed at.</p>
        </div>);
    }

    public next(): JSX.Element {
        let ret: JSX.Element = <span></span>;

        ret = this.getText();
        this.time += 1;
        return <div key={this.time}>{ret}</div>;
    }

    private getText(): JSX.Element {
        if (this.time === 0) {
            return (<div>
                <p>You sit down at the table hoping to see a friendly face.</p>
                <p>You see a dead fireplace.</p>
            </div>);
        }
        return WaitingTexts[Math.floor(Math.random() * WaitingTexts.length)];
    }
}