import * as React from 'react';

import styles from './game.module.css';

type Props = {
	messages: JSX.Element[],
	hints: string[],
	players: string[],
	inventory: string[],
	rooms: string[],
	items: string[],
	socket: SocketIOClient.Socket,
};
interface State {
	backgrounds: string[];
}
interface DataProp {
	dataStrArray?: string[];
	dataString?: string;
	dataElementArray?: JSX.Element[];
	onClick?: (event: React.FormEvent) => void;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function History(props: DataProp) {
	return (
		<div className={styles.history}>
			<div className={styles.scrollArea}>{props.dataElementArray}</div>
		</div>
	);
}

function Commands(props: DataProp) {
	return (
		<div className={styles.commands}>
			<form onSubmit={props.onClick}>
				<input type='text' placeholder={props.dataString} onChange={props.onChange} />
				<button type='submit' onClick={props.onClick}>Submit</button>
			</form>
		</div>
	);
}

function HintsArea(props: DataProp) {
	let hintElement: JSX.Element[] = [];
	if (props.dataStrArray !== undefined) {
		// currently slice so only 10 hints max
		props.dataStrArray.slice(0, 10).forEach((e, i) => {
			if (e.length > 0) {
				hintElement.push(<button key={i}>{e}</button>);
			}
		});
	}
	if (hintElement.length > 0) {
		return (
			<div className={styles.hints}>
				{hintElement}
			</div>
		);
	} else {
		return <p>There Are No Hints For You!</p>;
	}
}

function ListTemplate(props: DataProp) {
	let listElement: JSX.Element[] = [];
	if (props.dataStrArray !== undefined) {
		listElement = props.dataStrArray.map((e, i) => {
			return (<li key={i}>{e}</li>);
		});
	}
	if (listElement.length > 0) {
		return (
			<div>
				<p>{props.dataString}</p>
				<ol>{listElement}</ol>
			</div>
		);
	} else {
		return (
			<div>
				<p>{props.dataString}</p>
				<p>You have nothing, not even pants.</p>
			</div>
		);
	}
}

class GamePage extends React.Component<Props, State> {
	private command: string = '';

	constructor(props: Props) {
		super(props);
		this.state = {
			backgrounds: [
				'https://images.unsplash.com/photo-1542617454-e7d68f9d5626?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
				'https://images.unsplash.com/photo-1548368295-b7158d905383?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
				'https://images.unsplash.com/photo-1545263467-4e257e3b5ce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
				'https://images.unsplash.com/photo-1508404768051-0809ca78340f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9'
			],
		};
		this.handleCmdClick = this.handleCmdClick.bind(this);
		this.handleCmdChange = this.handleCmdChange.bind(this);
	}

	handleCmdChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.command = event.target.value;
	}

	handleCmdClick(event: React.FormEvent): void {
		event.preventDefault();
		this.props.socket.emit('sendCommand', { s: this.props.socket.id, d: this.command });
	}

	render() {
		let bkgndImage: string = this.state.backgrounds[Math.floor(Math.random() * this.state.backgrounds.length)];
		let size: string = '&w=' + window.innerWidth + '&h=' + window.innerHeight;
		return (
			<div
				className={styles['row']}
				style={{ backgroundImage: `url(${bkgndImage}${size}&fit=crop&auto=format)` }}
			>
				<div className={styles['main-content']}>
					<History dataElementArray={this.props.messages} />

					<Commands
						dataString="Command Thyself..."
						onClick={this.handleCmdClick}
						onChange={this.handleCmdChange} />

					<HintsArea dataStrArray={this.props.hints} />
				</div>
				<div className={styles['side-bar']}>
					<ListTemplate dataString={'Players in Dungeon'} dataStrArray={this.props.players} />
					<ListTemplate dataString={'Inventory'} dataStrArray={this.props.inventory} />
					<ListTemplate dataString={'Current Room'} dataStrArray={this.props.items} />
					<ListTemplate dataString={'Connected Rooms'} dataStrArray={this.props.rooms} />
				</div>
			</div>
		);
	}
}

export default GamePage;