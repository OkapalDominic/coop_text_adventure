import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
    username: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface State {
    username?: string;
}

class LobbyPage extends React.Component<Props, State> {
    state: State = {
        username: ''
    }
    constructor(props: Props) {
        super(props);
        this.logIt = this.logIt.bind(this);
        console.log(props.match.params.username);
    }

    componentDidMount() {
        this.setState({
            username: this.props.match.params.username
        });
    }

    logIt() {
        console.log(this.state.username);
    }

    render() {
        return (
            <p
                onClick={this.logIt}
            >
                Welcome {this.state.username}
            </p>
        );
    }
}

export default LobbyPage;
