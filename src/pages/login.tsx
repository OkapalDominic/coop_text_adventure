import * as React from 'react';
import { login } from '../components/api';
import { LoginRequest, LoginResponse } from '../api_objects/login_api';
import { RouteComponentProps } from 'react-router-dom';

import './login.css';

type Props = RouteComponentProps;

interface State {
    username?: string;
    error: {
        classes: string;
        message: string;
    };
}

class LoginPage extends React.Component<Props, State> {
    state: State = {
        username: '',
        error: {
            classes: 'error hidden',
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
        } else {
            this.setState({
                error: {
                    classes: 'error',
                    message: 'Thou Hast Chosen Poorly!',
                }
            });
        }
    }

    updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: event.target.value
        });
    }

    handleBegin(event: React.FormEvent) {
        event.preventDefault();
        let req: LoginRequest = new LoginRequest();
        req.username = this.state.username || '';
        if (sessionStorage.getItem('sessionKey') !== undefined) {
            req.sessionKey = sessionStorage.getItem('sessionKey') || '';
        }
        login(req, this.onLogin);
    }

    render() {
        return (
            <div>
                <h1 className="title">Choose Thy Adventerous Name Now</h1>
                <form onSubmit={this.handleBegin}>
                    <div className="group">
                    <input
                        className="group-front"
                        type="text"
                        placeholder="Username..."
                        onChange={this.updateUsername}
                    ></input>
                    <button
                        className="group-end"
                        type="submit"
                    >Begin Ye Adventure...</button>
                    </div>
                    <p className={this.state.error.classes}>{this.state.error.message}</p>
                </form>
            </div>
        );
    }
}


export default LoginPage;