import React, { Component } from 'react'
import { authLogout, authChecking } from "../../firebase";
import './style.css'

export default class AdminNavbar extends Component {

    state = {
        user: null
    }

    async componentDidMount() {
        await authChecking((user) => {
            console.log('user is ', user)

            this.setState({ user: user })
        })
    }

    async logout() {
        await authLogout()
    }

    render() {
        const { user } = this.state
        if (user) {
            return (
                <div className="adminNavbar">
                    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">Company name</a>
                        <span className="align-self-center p-auto ml-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Hello, {user.displayName}</span>
                        <ul className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                                <a className="nav-link" onClick={this.logout.bind(this)}>Sign out</a>
                            </li>
                        </ul>
                    </nav>

                    {this.props.children}

                </div>
            )
        } else {
            return (
                <div className="adminNavbar">
                    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">Company name</a>
                        <span className="align-self-center p-auto ml-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Hello, </span>
                        <ul className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                                <a className="nav-link" onClick={this.logout.bind(this)}>Sign out</a>
                            </li>
                        </ul>
                    </nav>

                    {this.props.children}

                </div>
            )
        }
    }
}