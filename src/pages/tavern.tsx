import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './tavern.module.css';

interface MatchParams {
    username: string;
}

type Props = RouteComponentProps<MatchParams>;

interface State {
    username?: string;
}

class LobbyPage extends React.Component<Props, State> {
    state: State = {
        username: ''
    }
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        // this.setState({
        //     username: this.props.match.params.username
        // });
    }

    render() {
        let username: string = sessionStorage.getItem('username') || '';
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>The Stinking Dragon Welp</h1>
                <br />
                <div className={styles.intro}>
                    <p>Cautiously, you enter the only tavern in town</p>
                    <p>The bartender greets you: "Welcome {username}, have a seat over there."</p>
                    <p>Unsure how he knows your name, you reluctantly sit at the table alone, near a dead fire.</p>
                </div>
            </div>
        );
    }
}

export default LobbyPage;
