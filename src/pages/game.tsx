import * as React from 'react';

import styles from './game.module.css';

type HistoryProps = {
	dataElementArray: JSX.Element[];
}
type ScrollAreaProps = {
	data: any[];
	autoScroll: boolean;
}
interface DataProp {
	dataStrArray?: string[];
	dataString?: string;
	emptyList?: string;
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
}
type CommandState = {
	commandText: string,
}
class Commands extends React.Component<CommandProps, CommandState> {
	state: CommandState = {
		commandText: '',
	}
	constructor(props: CommandProps) {
		super(props);

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			commandText: event.target.value,
		});
		this.props.onChange(event);
	}
	handleOnSubmit(event: React.FormEvent) {
		event.preventDefault();
		this.setState({
			commandText: '',
		});
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
						value={this.state.commandText}
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
		listElement = props.dataStrArray.reduce((result: JSX.Element[], element, index): JSX.Element[] => {
			if(element !== '') {
				result.push(<li key={index}>{element}</li>);
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
};

interface State {
	backgrounds: string[];
	width: number;
	height: number;
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
			width: window.innerWidth,
			height: window.innerHeight,
		};
		this.handleCmdClick = this.handleCmdClick.bind(this);
		this.handleCmdChange = this.handleCmdChange.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	handleCmdChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.command = event.target.value;
	}

	handleCmdClick(event: React.FormEvent): void {
		event.preventDefault();
		this.props.socket.emit('sendCommand', { s: this.props.socket.id, d: this.command });
	}

	updateDimensions() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	render() {
		let bkgndImage: string = this.state.backgrounds[Math.floor(Math.random() * this.state.backgrounds.length)];
		let size: string = '&w=' + window.innerWidth + '&h=' + window.innerHeight;
		if (this.state.width < this.state.height) {
			return (
				<div className={styles['rotate-container']}>
					<p className={styles['rotate-screen']}>Please rotate your screen to play this game.</p>
				</div>
			);
		}
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
					<ScrollArea autoScroll={false} data={[
						<ListTemplate
							key="players"
							dataString={'Players in Dungeon'}
							dataStrArray={this.props.players}
							emptyList="No one is here, not even you."
						/>,
						<ListTemplate
							key="inv"
							dataString={'Inventory'}
							dataStrArray={this.props.inventory}
							emptyList="You have nothing, not even pants."
						/>,
						<ListTemplate
							key="items"
							dataString={'Current Room'}
							dataStrArray={this.props.items}
							emptyList="The room appears empty."
						/>,
						<ListTemplate
							key="rooms"
							dataString={'Connected Rooms'}
							dataStrArray={this.props.rooms}
							emptyList="There are no exits."
						/>
					]} />
				</div>
			</div>
		);
	}
}

export default GamePage;