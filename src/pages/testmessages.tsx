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
		this.socket.on('connected', (res: DumpProp) => {
			console.log('connected')
			this.setState({ 
				res: {s: res.s, d: res.d },
				id: res.s,
				loginValid: true,
			});
		});
		
		this.socket.on('login', (res: DumpProp) => {
			console.log('login')
			if (res.s === 'success') {
				this.setState({ lobbyValid: true });
			}
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
					<p>Login</p>
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
						type='submit'
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
			lobby = (<div className={styles['back']} > Lobby </div>);
		}
		
		
		// -------------------------------------------
		// generate login html
		// also handles sending userCommands to server
		// -------------------------------------------
		let game = undefined;
		if (this.state.gameValid === true) {
			game = (<div className={styles['back']} > Game </div>);
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