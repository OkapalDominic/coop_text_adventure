import * as React from 'react';
import openSocket from 'socket.io-client';

import LoginPage from './login';
import LobbyPage from './tavern';
import GamePage from './game';
import ErrorPage from './error';

type Props = {};

// -------------------------------------------
// type used for pages available
// -------------------------------------------
type PAGE = 'NONE' | 'LOGIN' | 'LOBBY' | 'GAME';

// -------------------------------------------
// message interface for communication with server
// -------------------------------------------
interface DumpProp {
    s: string;
    d: string;
}

// -------------------------------------------
// state used by testmessages.tsx
// -------------------------------------------
interface State {
    res: DumpProp;
    d: string[]; // dungeons on server
    p: string[]; // players in dungeon
    h: string[]; // hints from server
    i: string[]; // player inventory
    a: string[]; // area information (connected areas and items) 
    id: string; // id on server
    u: string; // username
    dun: string; // dungeon currently in
    cmd: string; // cmd to send to server
    currentPage: PAGE; // What page to display
    loginMsg: string;
}

export class MainPage extends React.Component<Props, State> {
    socket: SocketIOClient.Socket;
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            res: {
                s: 'No Status',
                d: 'No Connection',
            },
            d: [],
            p: [],
            h: [],
            i: [],
            a: [],
            id: '???',
            u: '???',
            dun: '???',
            cmd: '',
            currentPage: 'NONE',
            loginMsg: 'N',
        }

        this.socket = openSocket('http://localhost:7777');
        this.listen();
    }

    // -------------------------------------------
    // listens for and handles all server responses
    // -------------------------------------------
    listen() {
        // -------------------------------------------
        // handle connected message
        // updates id
        // occurs when client first connects to server
        // -------------------------------------------
        this.socket.on('connected', (res: DumpProp) => {
            console.log('connected')
            this.setState({
                res: { s: res.s, d: res.d },
                id: res.d,
                currentPage: 'LOGIN',
            });
        });

        // -------------------------------------------
        // handle login message
        // indicates login succeded
        // occurs when client attempts to login to the server
        // -------------------------------------------
        this.socket.on('login', (res: DumpProp) => {
            console.log('login')
            if (res.s === 'success') {
                this.setState({
                    loginMsg: 'S',
                });
                window.setTimeout(() => {
                    this.setState({
                        currentPage: 'LOBBY',
                    }); 
                }, 1200);
            } else {
                this.setState({
                    loginMsg: 'E',
                });
            }
            this.setState({ res: { s: res.s, d: res.d } });
        });

        // -------------------------------------------
        // handle infoDungeon message
        // get list of all the (dungeons|players|items|areas) on the server
        // occurs when client logins in the server
        // occurs when dungeon game state is changed
        // -------------------------------------------
        this.socket.on('infoDungeon', (res: DumpProp) => {
            console.log('infoDungeon: ', res.s);
            switch (res.s) {
                case 'dungeons':
                    this.setState({
                        res: { s: 'dungeons - ' + res.s, d: res.d },
                        d: res.d.split(' '),
                    });
                    break;
                case 'players':
                    this.setState({
                        res: { s: 'dungeons - ' + res.s, d: res.d },
                        p: res.d.split(' '),
                    });
                    break;
                case 'hints':
                    this.setState({
                        res: { s: 'dungeons - ' + res.s, d: res.d },
                        h: res.d.split(' '),
                    });
                    break;
                case 'items':
                    this.setState({
                        res: { s: 'dungeons - ' + res.s, d: res.d },
                        i: res.d.split(' '),
                    });
                    case 'inventory':
                        this.setState({
                            res: { s: 'dungeons - ' + res.s, d: res.d },
                            i: res.d.split(' '),
                        });
                    break;
                case 'areas':
                    this.setState({
                        res: { s: 'dungeons - ' + res.s, d: res.d },
                        a: res.d.split(' '),
                    });
                    break;
                default:
                    console.log(`unknown infoDungeon data "${res.s}"`);
            }
        });

        // -------------------------------------------
        // handle joinDungeon message
        // indicates joinDungeon succeded
        // occurs when client attempts to enter a dungeon
        // -------------------------------------------
        this.socket.on('joinDungeon', (res: DumpProp) => {
            console.log('joinDungeon')
            if (res.s === 'success') {
                this.setState({
                    dun: res.d,
                    currentPage: 'GAME',
                });
            }
            this.setState({ res: { s: res.s, d: res.d } });
        });

        // -------------------------------------------
        // handle sendCommand message
        // indicates sendCommand succeded
        // occurs when client attempts to sendCommand to dungeon
        // -------------------------------------------
        this.socket.on('sendCommand', (res: DumpProp) => {
            console.log('sendCommand')
            this.setState({ res: { s: res.s, d: res.d } });
        });
    }

    render() {
        // -------------------------------------------
        // Render current page
        // -------------------------------------------
        switch (this.state.currentPage) {
            case 'LOGIN':
                return <LoginPage socket={this.socket} message={this.state.loginMsg} />;
            case 'LOBBY':
                return <LobbyPage username={this.state.u} dungeons={this.state.d} id={this.state.id} socket={this.socket} />;
            case 'GAME':
                return <GamePage />;
            default:
                return <ErrorPage />;
        }
    }
}

export default MainPage;