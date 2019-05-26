import * as React from 'react';
import { login } from '../components/api';
import { LoginRequest, LoginResponse } from '../api_objects/login_api';
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps;

interface State {
    username?: string;
    toLobby?: boolean;
    error?: {
        show: boolean;
        message: string;
    };
}

class LoginPage extends React.Component<Props, State> {
    state: State = {
        username: '',
        toLobby: false,
        error: {
            show: false,
            message: '',
        }
    };

    constructor(props: Props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.handleBegin = this.handleBegin.bind(this);
    }

    onLogin(res: LoginResponse): void {
        if (res.success) {
            sessionStorage.setItem('sessionKey', res.sessionKey);
            sessionStorage.setItem('username', res.username);
            this.props.history.push('/lobby');
            // this.setState({
            //     toLobby: true
            // });
        } else {
            this.setState({
                error: {
                    show: true,
                    message: 'Username not available',
                }
            });
        }
    }

    updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: event.target.value
        });
    }

    handleBegin(/*event: React.MouseEvent*/) {
        let req: LoginRequest = new LoginRequest();
        req.username = this.state.username || '';
        if(sessionStorage.getItem('sessionKey') !== undefined) {
            req.sessionKey = sessionStorage.getItem('sessionKey') || '';
        }
        login(req, this.onLogin);
    }

    render() {
        if (this.state.toLobby === true) {
            return <Redirect to={'/lobby/' + this.state.username} />;
        }

        let error = <span></span>;
        if(this.state.error && this.state.error.show) {
            error = <p>{this.state.error.message}</p>;
        }

        return (
            <div>
                <h1>Cooperative Text-Adventure</h1>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={this.updateUsername}
                ></input>
                {error}
                <button
                    type="submit"
                    onClick={this.handleBegin}
                >Begin</button>
            </div>
        );
    }
}


export default LoginPage;