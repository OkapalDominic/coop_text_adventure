import React from 'react';
import styles from './tavern.module.css';
import TavernDialog from '../components/tavern_dialog';

type Props = {
    username: string,
    dungeons: string[],
    socket: SocketIOClient.Socket,
    id: string,
    width: number,
    height: number,
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
        if (window.innerWidth >= window.innerHeight) {
            this.scroller.scrollIntoView({ behavior: "smooth" });
        }
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

    render() {
        if (this.props.width < this.props.height) {
            return (
                <div className="rotate-container">
                    <p className="rotate-screen">Please rotate your screen to play this game.</p>
                </div>
            );
        }
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>The Stinking Dragon Welp</h1>
                <div className={styles.row}>
                    <div className={styles.dialog}>
                        <div className={styles.scrollArea}>
                            <div>
                                {this.state.dialog}
                            </div>
                            <div ref={(ref) => this.scroller = ref}></div>
                            {/* End scrollArea */}
                        </div>
                        {/* End dialog */}
                    </div>
                    <div className={styles.dungeons}>
                        <div className={styles.scrollArea}>
                            <div className={styles['dungeon-btns']}>
                                {this.props.dungeons.map((dungeon) => {
                                    return (
                                        <button
                                            className={styles['dungeon-btn']}
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
                            {/* End scrollArea */}
                        </div>
                        {/* End dungeons */}
                    </div>
                    {/* End row */}
                </div>
                {/* End container */}
            </div>
        );
    }
}

export default LobbyPage;
