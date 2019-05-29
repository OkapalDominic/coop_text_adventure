import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './tavern.module.css';
import { LoginResponse } from '../api_objects/login_api';
import { enterRoom, leftRoom, removeAllListeners, readyToPlay } from '../components/api';
import { LeftRoom, ReadyToPlay } from '../api_objects/lobby_messages';

interface MatchParams {
    username: string;
}

type Props = RouteComponentProps<MatchParams>;

interface State {
    room: string;
    username: string;
    player2: string;
    userReady: boolean;
    p2Ready: boolean;
}

class LobbyPage extends React.Component<Props, State> {
    state: State = {
        room: sessionStorage.getItem('room') || '',
        username: sessionStorage.getItem('username') || '',
        player2: sessionStorage.getItem('player2') || '',
        userReady: false,
        p2Ready: false
    }
    constructor(props: Props) {
        super(props);

        this.onEnterRoom = this.onEnterRoom.bind(this);
        this.onLeaveRoom = this.onLeaveRoom.bind(this);
        this.handleReadyToPlay = this.handleReadyToPlay.bind(this);
        this.onReadyToPlay = this.onReadyToPlay.bind(this);
    }

    componentDidMount() {
        // activate listeners
        enterRoom(this.onEnterRoom);
        leftRoom(this.onLeaveRoom);
        readyToPlay({ ready: false, username: sessionStorage.getItem('username') || '' }, this.onReadyToPlay);
    }

    componentWillUnmount() {
        removeAllListeners();
    }

    onEnterRoom(res: LoginResponse): void {
        if (res.success) {
            let p2: number = res.players[0] === this.state.username ? 1 : 0;
            sessionStorage.setItem('player2', res.players[p2]);
            this.setState({
                player2: res.players[p2]
            });
        }
    }

    onLeaveRoom(res: LeftRoom): void {
        sessionStorage.setItem('player2', '');
        this.setState({
            player2: ''
        });
    }

    onReadyToPlay(res: ReadyToPlay): void {
        if (res.username === this.state.username) {
            this.setState({
                userReady: res.ready
            });
        } else {
            this.setState({
                p2Ready: res.ready
            });
        }
    }

    handleReadyToPlay(): void {
        readyToPlay({ ready: !this.state.userReady, username: this.state.username}, this.onReadyToPlay);
    }

    render() {
        let ready: string = 'ready to play!';
        let notReady: string = 'not ready to play.';
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>The Stinking Dragon Welp</h1>
                <br />
                <div className={styles.intro}>
                    <p>Cautiously, you enter the only tavern in town</p>
                    <p>The bartender greets you: "Welcome {this.state.username}, have a seat over there."</p>
                    <p>Unsure how he knows your name, you reluctantly sit at the table alone, near a dead fire.</p>
                </div>
                <br />
                <div className={styles.intro}>
                    <h2>Room: {this.state.room}</h2>
                    <p>You (i.e. {this.state.username}) are {this.state.userReady ? ready : notReady}</p>
                    <p>The other guy (i.e. {this.state.player2}) is {this.state.p2Ready ? ready : notReady}</p>
                </div>
                <br />
                <button type="button" onClick={this.handleReadyToPlay}>Ready To Play</button>
            </div>
        );
    }
}

export default LobbyPage;
