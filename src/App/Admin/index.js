import React, { Component } from 'react';
import { authChecking, authLogout } from "../../firebase";

import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'

class Admin extends Component {

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
        this.setState({ user: null })
    }

    render() {
        const { user } = this.state

        if (user) {
            return (
                <div>
                    <AdminNavbar>
                        <div className="container-fluid" style={{ minHeight: 500 + 'px', height: 93 + 'vh' }}>
                            <div className="row" style={{ height: 100 + '%' }}>

                                <AdminSidebar activeTab="dashboard" />

                                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">

                                    <h3>Hello Admin</h3>
                                    <br />
                                    <h4>this is {user.displayName}</h4>
                                    <br />
                                    <img src={user.photoURL} alt="profile_img" />
                                    <br />
                                    <br />
                                    <button className="btn btn-secondary" onClick={this.logout.bind(this)} >Logout</button>
                                </main>

                            </div>
                        </div>
                    </AdminNavbar>
                        
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default Admin;
