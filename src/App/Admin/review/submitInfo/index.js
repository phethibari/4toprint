import React, { Component } from 'react';
import { authChecking, authLogout } from "../../../../firebase";
import '../style.css'

import { getImgs, getImgUrls } from "../../../../firebase/firebaseInfo";

import AdminNavbar from '../../AdminNavbar'
import AdminSidebar from '../../AdminSidebar'

import SingleList from '../singleList'

class OrderInfo extends Component {

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
        getImgs(this.props.match.params['id'])
            .then(infos => {
                console.log('all is infos are', infos.val())

                this.setState({ infos: infos.val() })

                getImgUrls(this.props.match.params['id'])
                    .then(urls => {
                        console.log('urls is ', urls.val())
                    })
                    .catch(error => {
                        console.log('error is ', error)
                    })

            })
            .catch(error => {
                console.log('error is ', error)
            })
    }

    render() {
        console.log(this.props.match)
        const { user, infos } = this.state

        if (user && infos !== null) {
            return (
                <div>
                    <AdminNavbar>
                        <div className="container-fluid" style={{ minHeight: 500 + 'px', height: 93 + 'vh' }}>
                            <div className="row" style={{ height: 100 + '%' }}>

                                <AdminSidebar activeTab="reviewPosts" />

                                <main role="main" className="content-body-review col-md-10 ml-sm-auto col-lg-10 pt-3 px-4">

                                    <h3>Review Info</h3>
                                    <br />

                                    <SingleList info={infos} />

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

export default OrderInfo;
