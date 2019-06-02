import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import openSocket from 'socket.io-client';

import styles from './testmessages.module.css'

type Props = RouteComponentProps;

interface DumpProp {
	s: string;
}

function ConnectedStatus(prop: DumpProp) {
	return (
		<div className={styles['back']} ><p>{prop.s}</p></div>
	);
}

interface State {
	s: string;
}

export class TestPage extends React.Component<Props, State> {
	socket: SocketIOClient.Socket;
	state: State;
	
	constructor(props: Props) {
        super(props);
		
		this.state = { s: 'No Connection', }
		
		this.socket = openSocket('http://localhost:7777');
		this.listen();
	}
	
	listen() {
		this.socket.on('connected', (res: string) => {
			console.log('hello');
			this.setState({ s: res, });
		});
	}
	
	loginSubmit(event: React.FormEvent) {
        event.preventDefault();
	}
	
	render() {
		return (
			<ConnectedStatus s={this.state.s} />
		);
	}
}

export default TestPage;