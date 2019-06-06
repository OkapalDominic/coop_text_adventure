import * as React from 'react';

import styles from './game.module.css';

type HistoryProps = {
	dataElementArray: JSX.Element[];
}
type ScrollAreaProps = {
	data: any[];
	autoScroll: boolean;
}

class ScrollArea extends React.Component<ScrollAreaProps> {
	private scroller: any;

	constructor(props: ScrollAreaProps) {
		super(props);
	}
	componentDidUpdate() {
		if (this.props.autoScroll) {
			this.scroller.scrollIntoView({ behavior: "smooth" });
		}
	}
	render() {
		return (
			<div className={styles.scrollArea}>
				<div>{this.props.data}</div>
				<div ref={(ref) => this.scroller = ref}></div>
			</div>
		);
	}
}

function History(props: HistoryProps) {

	return (
		<div className={styles.history} >
			<ScrollArea autoScroll={true} data={props.dataElementArray} />
		</div>
	);
}

type CommandProps = {
	dataString: string,
	onClick: (event: React.FormEvent) => void,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	command: string,
}
type CommandState = {
}
class Commands extends React.Component<CommandProps, CommandState> {
	constructor(props: CommandProps) {
		super(props);

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.props.onChange(event);
	}
	handleOnSubmit(event: React.FormEvent) {
		event.preventDefault();
		this.props.onClick(event);
	}
	render() {
		return (
			<div className={styles.commands}>
				<form onSubmit={this.handleOnSubmit}>
					<input
						type='text'
						placeholder={this.props.dataString}
						onChange={this.handleOnChange}
						value={this.props.command}
					/>
					<button
						type='submit'
						onClick={this.handleOnSubmit}
					>Submit</button>
				</form>
			</div>
		);
	}
}

type HintsProps = {
	dataStrArray: string[],
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
function HintsArea(props: HintsProps) {
	let hintElement: JSX.Element[] = [];
	if (props.dataStrArray !== undefined) {
		// currently slice so only 10 hints max
		props.dataStrArray.slice(0, 10).forEach((e, i) => {
			if (e.length > 0) {
				hintElement.push(<button key={i} onClick={props.onClick} value={e}>{e}</button>);
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

type ListProps = {
	dataStrArray: string[],
	dataString: string,
	emptyList: string,
	addToCommand: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
function ListTemplate(props: ListProps) {
	let listElement: JSX.Element[] = [];
	if (props.dataStrArray !== undefined) {
		listElement = props.dataStrArray.reduce((result: JSX.Element[], element, index): JSX.Element[] => {
			if (element !== '') {
				result.push(
					<li>
						<button
							key={index}
							type="button"
							value={element}
							className={styles['list-btn']}
							onClick={props.addToCommand}
						>{element}</button>
					</li>
				);
			}
			return result;
		}, []);
	}
	if (listElement.length > 0) {
		return (
			<div className={styles.list}>
				<p className={styles['list-title']}>{props.dataString}</p>
				<ul>{listElement}</ul>
			</div>
		);
	} else {
		return (
			<div className={styles.list}>
				<p className={styles['list-title']}>{props.dataString}</p>
				<p>{props.emptyList}</p>
			</div>
		);
	}
}

type Props = {
	messages: JSX.Element[],
	hints: string[],
	players: string[],
	inventory: string[],
	rooms: string[],
	items: string[],
	socket: SocketIOClient.Socket,
	width: number,
	height: number,
	onLeave: () => void,
	fullScreen: () => void,
};

interface State {
	backgrounds: string[];
	command: string;
}
class GamePage extends React.Component<Props, State> {
	private imgIndex: number = 0;

	state: State = {
		backgrounds: [
			'https://images.unsplash.com/photo-1542617454-e7d68f9d5626?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
			'https://images.unsplash.com/photo-1548368295-b7158d905383?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
			'https://images.unsplash.com/photo-1545263467-4e257e3b5ce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
			'https://images.unsplash.com/photo-1508404768051-0809ca78340f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9'
		],
		command: '',
	};

	constructor(props: Props) {
		super(props);
		this.handleCmdClick = this.handleCmdClick.bind(this);
		this.handleCmdChange = this.handleCmdChange.bind(this);
		this.handleHintClick = this.handleHintClick.bind(this);
		this.handleAddToCommand = this.handleAddToCommand.bind(this);
	}

	handleHintClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		this.setState({
			command: event.currentTarget.value,
		});
	}

	handleAddToCommand(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		this.setState({
			command: this.state.command + event.currentTarget.value,
		});
	}

	handleCmdChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			command: event.target.value,
		});
	}

	handleCmdClick(event: React.FormEvent): void {
		event.preventDefault();
		this.props.socket.emit('sendCommand', { s: this.props.socket.id, d: this.state.command });
		if (this.state.command.split(' ')[0] === 'leave') {
			this.props.onLeave();
		}
		if (this.state.command.split(' ')[0] === 'enter') {
			this.imgIndex = Math.floor(Math.random() * this.state.backgrounds.length);
		}
		this.setState({
			command: '',
		});
	}

	render() {
		if (this.props.width < this.props.height) {
			return (
				<div className="rotate-container">
					<p className="rotate-screen">Please rotate your screen to play this game.</p>
				</div>
			);
		}
		let bkgndImage: string = this.state.backgrounds[this.imgIndex];
		let size: string = '&w=' + this.props.width + '&h=' + this.props.height;
		return (
			<div
				className={styles['row']}
				style={{ backgroundImage: `url(${bkgndImage}${size}&fit=crop&auto=format)` }}
			>
				<div className={styles['main-content']}>
					<History
						dataElementArray={this.props.messages}
					/>

					<Commands
						dataString="Command Thyself..."
						onClick={this.handleCmdClick}
						onChange={this.handleCmdChange}
						command={this.state.command}
					/>

					<HintsArea
						dataStrArray={this.props.hints}
						onClick={this.handleHintClick}
					/>
					<button type="button" onClick={this.props.fullScreen}>Toggle Fullscreen</button>
				</div>
				<div className={styles['side-bar']}>
					<ScrollArea autoScroll={false} data={[
						<ListTemplate
							key="players"
							dataString={'Players in Dungeon'}
							dataStrArray={this.props.players}
							emptyList="No one is here, not even you."
							addToCommand={this.handleAddToCommand}
						/>,
						<ListTemplate
							key="inv"
							dataString={'Inventory'}
							dataStrArray={this.props.inventory}
							emptyList="You have nothing, not even pants."
							addToCommand={this.handleAddToCommand}
						/>,
						<ListTemplate
							key="items"
							dataString={'Current Room'}
							dataStrArray={this.props.items}
							emptyList="The room appears empty."
							addToCommand={this.handleAddToCommand}
						/>,
						<ListTemplate
							key="rooms"
							dataString={'Connected Rooms'}
							dataStrArray={this.props.rooms}
							emptyList="There are no exits."
							addToCommand={this.handleAddToCommand}
						/>
					]} />
				</div>
			</div>
		);
	}
}

export default GamePage;