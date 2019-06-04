import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import openSocket from 'socket.io-client';

import styles from './testmessages.module.css'

type Props = RouteComponentProps;

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
	loginValid: boolean;
	lobbyValid: boolean;
	gameValid: boolean;
}

export class TestPage extends React.Component<Props, State> {
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
			loginValid: false,
			lobbyValid: false,
			gameValid: false,
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
				res: {s: res.s, d: res.d },
				id: res.d,
				loginValid: true,
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
				this.setState({ lobbyValid: true });
			}
			this.setState({ res: {s: res.s, d: res.d } });
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
						res: {s: 'dungeons - ' + res.s, d: res.d },
						d: res.d.split(' '),
					});
					break;
				case 'players':
					this.setState({ 
						res: {s: 'players - ' + res.s, d: res.d },
						p: res.d.split(' '),
					});
					break;
				case 'hints':
					this.setState({ 
						res: {s: 'hints - ' + res.s, d: res.d },
						h: res.d.split(' '),
					});
					break;
				case 'items':
					this.setState({ 
						res: {s: 'items - ' + res.s, d: res.d },
						i: res.d.split(' '),
					});
					break;
				case 'areas':
					this.setState({ 
						res: {s: 'areas - ' + res.s, d: res.d },
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
					gameValid: true,
				});
			}
			this.setState({ res: {s: res.s, d: res.d } });
		});
		
		// -------------------------------------------
		// handle sendCommand message
		// indicates sendCommand succeded
		// occurs when client attempts to sendCommand to dungeon
		// -------------------------------------------
		this.socket.on('sendCommand', (res: DumpProp) => {
			console.log('sendCommand -', res.s)
			this.setState({ res: {s: res.s, d: res.d } });
		});
	}
	
	render() {
		// -------------------------------------------
		// generate login html
		// also handles sending login to server
		// -------------------------------------------
		let login = undefined;
		if (this.state.loginValid === true) {
			login = (
				<div className={styles['back']} >
					<p>Login - { this.state.id }</p>
					<input 
						type='text'
						placeholder='Thy Adventerous Name...'
						onChange={ (event) => {
							//console.log('username: ', event.target.value);
							this.setState({ u: event.target.value});
						} }
					/>
					<br />
					<button
						type = 'submit'
						onClick = { (event) => {
							event.preventDefault();
							this.socket.emit('login', {
								s: this.state.id,
								d: this.state.u,
							});
						} }
					>Begin</button>
				</div>
			);
		}
		
		// -------------------------------------------
		// generate lobby html
		// also handles sending joinGame to server
		// -------------------------------------------
		let lobby = undefined;
		if (this.state.lobbyValid === true) {
			lobby = (
				<div className={styles['back']} >
					<p>Lobby - { this.state.u }</p>
					{ this.state.d.map((dungeon) => {
						return (
							<button
								key = { dungeon }
								type = 'submit'
								onClick = { (event) => {
									event.preventDefault();
									this.socket.emit('joinDungeon', {
										s: this.state.id,
										d: dungeon,
									});
								} }
							>{ dungeon }</button>
						);
					}) }
				</div>
			);
		}
		
		
		// -------------------------------------------
		// generate game html
		// also handles sending userCommands to server
		// -------------------------------------------
		let game = undefined;
		if (this.state.gameValid === true) {
			game = (
				<div className={styles['back']} >
					<p>Game - { this.state.dun }</p>
					<input 
						type='text'
						placeholder='send cmd to server'
						onChange={ (event) => {
							//console.log('cmd: ', event.target.value);
							this.setState({ cmd: event.target.value});
						} }
					/>
					<br />
					<button
						type = 'submit'
						onClick = { (event) => {
							event.preventDefault();
							this.socket.emit('sendCommand', {
								s: this.state.id,
								d: this.state.cmd,
							});
						} }
					>Begin</button>
					<p>Players</p>
					{ this.state.p.join(' ') } <br />
					<p>Hints</p>
					{ this.state.h.join(' ') } <br />
					<p>Items</p>
					{ this.state.i.join(' ') } <br />
					<p>Area</p>
					{ this.state.a.join(' ') } <br />
				</div>
			);
		}
		
		// -------------------------------------------
		// Render html
		// -------------------------------------------
		return (
			<div>
				<div className={styles['back']} >
					ServerStatus (ie last message) <br />
					{ this.state.res.s } <br />
					{ this.state.res.d }
				</div>
				{ login }
				{ lobby }
				{ game }
			</div>
		);
	}
}

export default TestPage;