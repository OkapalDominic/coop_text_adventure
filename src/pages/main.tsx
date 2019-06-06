import * as React from 'react';
import openSocket from 'socket.io-client';

import LoginPage from './login';
import LobbyPage from './tavern';
import GamePage from './game';
import ErrorPage from './error';
import WinnerPage from './winner';

type Props = {};

// -------------------------------------------
// type used for pages available
// -------------------------------------------
type PAGE = 'NONE' | 'LOGIN' | 'LOBBY' | 'GAME' | 'WINNER';

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
    dungeons: string[]; // dungeons on server
    players: string[]; // players in dungeon
    hints: string[]; // hints from server
    inventory: string[]; // player inventory
    items: string[]; // items in the area
    connectedAreas: string[]; // area information (connected areas and items) 
    id: string; // id on server
    username: string; // username
    messages: JSX.Element[]; // message log
    currentDungeon: string; // dungeon currently in
    cmd: string; // cmd to send to server
    currentPage: PAGE; // What page to display
    loginMsg: string; // S, N, or E for success, neutral, error
    width: number; // width of the window
    height: number; // height of the window
    fullscreen: boolean // If fullscreen or not
}

export class MainPage extends React.Component<Props, State> {
    socket: SocketIOClient.Socket;
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            dungeons: [],
            players: [],
            hints: ['chat ', 'enter ', 'pickup ', 'drop ', 'use ', 'leave'],
            inventory: [],
            items: [],
            connectedAreas: [],
            id: '???',
            username: '???',
            messages: [],
            currentDungeon: '???',
            cmd: '',
            currentPage: 'NONE',
            loginMsg: 'N',
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            fullscreen: false,
        }

        this.handleWinButton = this.handleWinButton.bind(this);
        this.handleLeaveDungeon = this.handleLeaveDungeon.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.fullscreen = this.fullscreen.bind(this);
        this.socket = openSocket('http://localhost:7777');
        this.listen();
    }
    
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });
    }

    fullscreen(): void {
        console.log(document.fullscreenElement);
        if(document.fullscreenElement === null) {
            document.body.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        this.updateDimensions();
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
            this.logIt('connected', res);
            this.setState({
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
            this.logIt('login', res);
            if (res.s === 'success') {
                this.setState({
                    loginMsg: 'S',
                    username: res.d,
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
        });

        // -------------------------------------------
        // handle infoDungeon message
        // get list of all the (dungeons|players|items|areas) on the server
        // occurs when client logins in the server
        // occurs when dungeon game state is changed
        // -------------------------------------------
        this.socket.on('infoDungeon', (res: DumpProp) => {
            this.logIt('infoDungeon', res);
            switch (res.s) {
                case 'dungeons':
                    this.setState({
                        dungeons: res.d.split('\n'),
                    });
                    break;
                case 'players':
                    this.setState({
                        players: res.d.split('\n'),
                    });
                    break;
                case 'hints':
                    // this.setState({
                    //     hints: res.d.split('\n'),
                    // });
                    break;
                case 'items':
                    this.setState({
                        items: res.d.split('\n'),
                    });
                    break;
                case 'inventory':
                    this.setState({
                        inventory: res.d.split('\n'),
                    });
                    break;
                case 'areas':
                    this.setState({
                        connectedAreas: res.d.split('\n'),
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
            this.logIt('joinDungeon', res);
            if (res.s === 'success') {
                this.setState({
                    currentDungeon: res.d,
                    currentPage: 'GAME',
                });
            }
        });

        // -------------------------------------------
        // handle sendCommand message
        // indicates sendCommand succeded
        // occurs when client attempts to sendCommand to dungeon
        // -------------------------------------------
        this.socket.on('sendCommand', (res: DumpProp) => {
            this.logIt('sendCommand', res);
            let msg: JSX.Element = <div key={this.state.messages.length}>{res.s}: {res.d}</div>;
            let msgs: JSX.Element[] = this.state.messages;
            msgs.push(msg);
            this.setState({
                messages: msgs,
            });
        });

        this.socket.on('winner', (res: DumpProp) => {
            this.logIt('winner', res);
            let msg: JSX.Element = <div key={this.state.messages.length}>{res.s} {res.d}</div>;
            let msgs: JSX.Element[] = this.state.messages;
            msgs.push(msg);
            this.setState({
                messages: msgs,
                currentPage: 'WINNER',
            });
        });
    }

    handleWinButton(event: React.FormEvent): void {
        event.preventDefault();
        this.setState({
            currentPage: 'LOBBY',
        });
    }

    handleLeaveDungeon(): void {
        this.setState({
            currentPage: 'LOBBY',
        });
    }

    logIt(on: string, res: DumpProp) {
        console.log(on);
        console.log(`res.s: ${res.s}`);
        console.log(`res.d: ${res.d}`);
    }

    render() {
        // -------------------------------------------
        // Render current page
        // -------------------------------------------
        switch (this.state.currentPage) {
            case 'LOGIN':
                return (<LoginPage
                    socket={this.socket}
                    message={this.state.loginMsg}
                    width={this.state.width}
                    height={this.state.height}
                    fullScreen={this.fullscreen}
                />);
            case 'LOBBY':
                return (<LobbyPage
                    username={this.state.username}
                    dungeons={this.state.dungeons}
                    id={this.state.id}
                    socket={this.socket}
                    width={this.state.width}
                    height={this.state.height}
                    fullScreen={this.fullscreen}
                />);
            case 'GAME':
                return (<GamePage
                    messages={this.state.messages}
                    hints={this.state.hints}
                    players={this.state.players}
                    inventory={this.state.inventory}
                    rooms={this.state.connectedAreas}
                    items={this.state.items}
                    socket={this.socket}
                    width={this.state.width}
                    height={this.state.height}
                    onLeave={this.handleLeaveDungeon}
                    fullScreen={this.fullscreen}
                />);
            case 'WINNER':
                return (<WinnerPage
                    username={this.state.username}
                    onClick={this.handleWinButton}
                    width={this.state.width}
                    height={this.state.height}
                    fullScreen={this.fullscreen}
                />);
            default:
                return <ErrorPage />;
        }
    }
}

export default MainPage;