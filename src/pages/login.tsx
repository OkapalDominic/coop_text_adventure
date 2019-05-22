import * as React from 'react';
import { login } from '../components/api';
import { LoginRequest, LoginResponse } from '../api_objects/login_api';
import { Redirect } from 'react-router';

interface Props {}

interface State {
    username?: string;
    toLobby?: boolean;
}

class LoginPage extends React.Component<Props, State> {
    state: State = {
        username: '',
        toLobby: false
    };

    constructor(props: any) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.handleBegin = this.handleBegin.bind(this);
    }

    onLogin(res: LoginResponse): void {
        console.log('logged in: ' + res.success);
        if (res.success) {
            this.setState({
                toLobby: true
            });
        }
    }

    updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: event.target.value
        });
    }

    handleBegin(event: React.MouseEvent) {
        console.log(this.state.username);
        let req: LoginRequest = { username: this.state.username || '' };
        login(req, this.onLogin);
    }

    render() {
        if (this.state.toLobby === true) {
            return <Redirect to={'/lobby/' + this.state.username} />
        }

        return (
            <div>
                <h1>Cooperative Text-Adventure</h1>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={this.updateUsername}
                ></input>
                <button
                    type="submit"
                    onClick={this.handleBegin}
                >Begin</button>
            </div>
        );
    }
}


export default LoginPage;