import React from 'react';
import styles from './tavern.module.css';
import TavernDialog from '../components/tavern_dialog';

type Props = {
    username: string,
    dungeons: string[],
    socket: SocketIOClient.Socket,
    id: string,
};

interface State {
    dialog: JSX.Element[];
    width: number;
    height: number;
}

const TIME_TO_WAIT = 10000;

class LobbyPage extends React.Component<Props, State> {
    private myDialog: TavernDialog;
    private interval: number = 0;
    private scroller: any;
    state: State = {
        dialog: [],
        width: window.innerWidth,
        height: window.innerHeight,
    }
    constructor(props: Props) {
        super(props);

        this.startMsgInterval = this.startMsgInterval.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.myDialog = new TavernDialog(this.props.username);
    }
    updateDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
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
        window.removeEventListener("resize", this.updateDimensions);
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
        if (this.state.width < this.state.height) {
            return (
                <div className={styles['rotate-container']}>
                    <p className={styles['rotate-screen']}>Please rotate your screen to play this game.</p>
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
