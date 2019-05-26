import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

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
            <p>
                Welcome to the lobby {username}!
            </p>
        );
    }
}

export default LobbyPage;
