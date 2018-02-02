import React, { Component } from 'react';
import { authChecking, authLogin } from "../firebase";

import Navbar from './Navbar'

class Login extends Component {

    async componentDidMount() {
        console.log('this.props is ', this.props)
        authChecking((user) => {
            if (user) {
                this.props.history.push('/')
            }
        })
    }

    async login() {
        await authLogin((result) => {
            this.setState({ user: result.user })
        })
    }

    render() {
        return (
            <Navbar>
                <h3>This is Login page</h3>
                <br />
                <button onClick={this.login.bind(this)} >Login with Facebook</button>
            </Navbar>
        )
    }
}

export default Login;
