import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './tavern.module.css';
import { LoginResponse } from '../api_objects/login_api';
// import { enterRoom, leftRoom, removeAllListeners, readyToPlay, gameSetup } from '../components/api';
import { LeftRoom, ReadyToPlay, GameSetup } from '../api_objects/lobby_messages';
import TavernDialog from '../components/tavern_dialog';

type Props = {
    username: string,
    dungeons: string[],
    socket: SocketIOClient.Socket,
    id: string,
};

interface State {
    dialog: JSX.Element[];
}

const TIME_TO_WAIT = 10000;

class LobbyPage extends React.Component<Props, State> {
    private myDialog: TavernDialog;
    private interval: number = 0;
    private scroller: any;
    state: State = {
        dialog: [],
    }
    constructor(props: Props) {
        super(props);

        this.onGameSetup = this.onGameSetup.bind(this);
        this.startMsgInterval = this.startMsgInterval.bind(this);

        this.myDialog = new TavernDialog(this.props.username);
    }

    componentDidMount() {
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
        window.clearInterval(this.interval);
    }

    startMsgInterval(): void {
        this.interval = window.setInterval(() => {
            let tmp: JSX.Element[] = this.state.dialog;
            tmp.push(this.myDialog.next());
            this.setState({
                dialog: tmp
            });
        }, TIME_TO_WAIT);
    }

    onGameSetup(res: GameSetup): void {
        //this.props.history.push('/game');
    }

    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>The Stinking Dragon Welp</h1>
                <br />
                <div className={styles.dialog}>
                    <div className={styles.scrollArea}>
                        <div>
                            {this.state.dialog}
                        </div>
                        <div ref={(ref) => this.scroller = ref}></div>
                    </div>
                </div>
                <div className={styles.dungeons}>
                    <div className={styles.scrollArea}>
                        {this.props.dungeons.map((dungeon) => {
                            return (
                                <button
                                    key={dungeon}
                                    type='button'
                                    onClick={(event) => {
                                        this.props.socket.emit('joinDungeon', {
                                            s: this.props.id,
                                            d: dungeon,
                                        });
                                    }}
                                >
                                    {dungeon}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default LobbyPage;
