import React, { Component } from 'react';
import { authChecking, authLogout } from "../../../firebase";
import './style.css'

import { getContactInfo, getImgs } from "../../../firebase/firebaseInfo";

import AdminNavbar from '../AdminNavbar'
import AdminSidebar from '../AdminSidebar'

import SingleList from './singleList'

class Review extends Component {

    state = {
        user: null,
        infos: null
    }

    async componentDidMount() {
        await authChecking((user) => {

            this.setState({ user: user })
        })

        this.getAllRequest()        
    }

    async logout() {
        await authLogout()
        this.setState({ user: null })
    }

    getAllRequest() {
        getContactInfo()
            .then(infos => {

                this.setState({ infos: infos.val() })
            })
            .catch(error => {
                console.log('error is ', error)
            })
    }

    // getRequestImage() {
    //     getImgs()
    // }

    render() {
        const { user, infos } = this.state

        if (user && infos !== null) {
            return (
                <div>
                    <AdminNavbar>
                        <div className="container-fluid" style={{ minHeight: 500 + 'px', height: 93 + 'vh' }}>
                            <div className="row" style={{ height: 100 + '%' }}>

                                <AdminSidebar activeTab="reviewPosts" />

                                <main role="main" className="content-body-review col-md-10 ml-sm-auto col-lg-10 pt-3 px-4">

                                    <h3>Review Posts</h3>
                                    <br />
                                    
                                    {
                                        Object.keys(infos).map(i => {

                                            console.log('infos[i] is ', infos[i])

                                            return (
                                                <SingleList key={i} info={infos[i]} />
                                            )

                                        })
                                    }

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

export default Review;
