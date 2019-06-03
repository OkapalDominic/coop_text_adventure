import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import openSocket from 'socket.io-client';

import styles from './testmessages.module.css'

type Props = RouteComponentProps;

interface DumpProp {
	s: string;
	d: string;
}

interface State {
	res: DumpProp;
	id: string; // id on server
	u: string; // username
	d: string[]; // dungeons on server
	dun: string; // dungeon currently in
	cmd: string; // cmd to send to server
	loginValid: boolean;
	lobbyValid: boolean;
	gameValid: boolean;
}

function ServerStatus(prop: DumpProp) {
	return (
		<div className={styles['back']} >
			ServerStatus (ie last message) <br />
			{ prop.s } <br />
			{ prop.d }
		</div>
	);
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
			id: '???',
			u: '???',
			d: [],
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
		// handle dungeons message
		// get list of all the dungeons on the server
		// occurs when client logins in the server
		// -------------------------------------------
		this.socket.on('dungeons', (res: DumpProp) => {
			console.log('dungeons')
			this.setState({ 
				res: {s: res.s, d: res.d },
				d: res.d.split(' '),
			});
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
			console.log('sendCommand')
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
		// generate login html
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
				</div>
			);
		}
		
		// -------------------------------------------
		// Render html
		// -------------------------------------------
		return (
			<div>
				<ServerStatus s={this.state.res.s} d={this.state.res.d} />
				{ login }
				{ lobby }
				{ game }
			</div>
		);
	}
}

export default TestPage;