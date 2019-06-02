import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './tavern.module.css';
import { LoginResponse } from '../api_objects/login_api';
import { enterRoom, leftRoom, removeAllListeners, readyToPlay, gameSetup } from '../components/api';
import { LeftRoom, ReadyToPlay, GameSetup } from '../api_objects/lobby_messages';
import TavernDialog from '../components/tavern_dialog';

type Props = RouteComponentProps;

interface State {
    room: string;
    username: string;
    player2: string;
    userReady: boolean;
    p2Ready: boolean;
    dialog: JSX.Element[];
    readyDialog: JSX.Element;
}

const TIME_TO_WAIT = 10000;

class LobbyPage extends React.Component<Props, State> {
    private myDialog: TavernDialog;
    private interval: number = 0;
    private intervalRunning: boolean = true;
    private scroller:any;
    state: State = {
        room: sessionStorage.getItem('room') || '',
        username: sessionStorage.getItem('username') || '',
        player2: sessionStorage.getItem('player2') || '',
        userReady: false,
        p2Ready: false,
        dialog: [],
        readyDialog: <span></span>
    }
    constructor(props: Props) {
        super(props);

        this.onEnterRoom = this.onEnterRoom.bind(this);
        this.onLeaveRoom = this.onLeaveRoom.bind(this);
        this.handleReadyToPlay = this.handleReadyToPlay.bind(this);
        this.onReadyToPlay = this.onReadyToPlay.bind(this);
        this.onGameSetup = this.onGameSetup.bind(this);
        this.startMsgInterval = this.startMsgInterval.bind(this);

        this.myDialog = new TavernDialog([this.state.username, this.state.player2], this.state.room, this.handleReadyToPlay);
    }

    componentDidMount() {
        // activate listeners
        enterRoom(this.onEnterRoom);
        leftRoom(this.onLeaveRoom);
        readyToPlay({ ready: false, username: sessionStorage.getItem('username') || '' }, this.onReadyToPlay);
        gameSetup(this.onGameSetup);
        let d: JSX.Element[] = this.state.dialog;
        d.push(this.myDialog.setup());
        this.setState({
            dialog: d
        });
        this.startMsgInterval();
    }

    componentDidUpdate() {
        this.scroller.scrollIntoView({ behavior: "smooth" });
    }

    componentWillUnmount(): void {
        removeAllListeners();
        window.clearInterval(this.interval);
    }

    startMsgInterval(): void {
        this.intervalRunning = true;
        this.interval = window.setInterval(() => {
            let tmp: JSX.Element[] = this.state.dialog;
            let next: [JSX.Element, boolean] = this.myDialog.next();
            if (next[1]) {
                tmp.push(next[0]);
                this.setState({
                    dialog: tmp
                });
            } else {
                window.clearInterval(this.interval);
                this.intervalRunning = false;
            }
        }, TIME_TO_WAIT);
    }

    onGameSetup(res: GameSetup): void {
        this.props.history.push('/game');
    }

    onEnterRoom(res: LoginResponse): void {
        if (res.success) {
            let p2: number = res.players[0] === this.state.username ? 1 : 0;
            sessionStorage.setItem('player2', res.players[p2]);
            this.setState({
                player2: res.players[p2]
            });
            this.myDialog.updatePlayers([this.state.username, this.state.player2]);
        }
    }

    onLeaveRoom(res: LeftRoom): void {
        sessionStorage.setItem('player2', '');
        this.setState({
            player2: '',
            readyDialog: <span></span>
        });
        this.startMsgInterval();
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
        if (this.intervalRunning) {
            return;
        }
        let readyMsg: JSX.Element = <div>
            <p>You tell {this.state.player2} that you're {this.state.userReady ? '' : 'not'} ready to go.</p>
            <p>{this.state.player2} tells you they're {this.state.p2Ready ? '' : 'not'} ready to go.</p>
        </div>;
        this.setState({
            readyDialog: readyMsg
        });
    }

    handleReadyToPlay(): void {
        readyToPlay({ ready: !this.state.userReady, username: this.state.username }, this.onReadyToPlay);
    }

    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>The Stinking Dragon Welp</h1>
                <br />
                <div className={styles.intro}>
                    <div className={styles.scrollArea}>
                        <div>
                            {this.state.dialog}
                        </div>
                        {this.state.readyDialog}
                        <div ref={(ref) => this.scroller = ref}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LobbyPage;
