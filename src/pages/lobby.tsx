import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props {
    username: string;
}

interface State {
    username?: string;
    toLobby?: boolean;
}

class LobbyPage extends React.Component<Props, State> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.logIt = this.logIt.bind(this);
        let { params } = props.match;
        console.log(params);
    }
    
    logIt() {
        for(let prop in this.props) {
            console.log(prop);
        }
        console.log(this.props);
    }

    render() {
        return (
            <p
                onClick={this.logIt}
            >Welcome</p>
        );
    }
}

export default LobbyPage;
