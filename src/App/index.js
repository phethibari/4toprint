import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { authChecking, authLogout } from "../firebase";

import Admin from './Admin'
import Review from './Admin/review/index'
import OrderInfo from './Admin/review/submitInfo/index'
import Home from './Home'
import Login from './Login'
import Upload from './Upload'
import Loading from './Loading'
import Notfound from './Notfound'

class App extends Component {

    state = {
        user: false
    }

    async componentDidMount() {
        await authChecking((user) => {
            console.log('user is ', user)

            this.setState({ user: user })
        })
    }
    
    render() {
        const { user } = this.state
        
        console.log('props is ', this.props)

        if (user) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/upload" component={Upload} />
                        <Route exact path="/admin/review" component={Review} />
                        <Route path="/admin/review/:id" component={OrderInfo} />
                        <Route path="/admin" component={Admin} />
                    </Switch>
                </BrowserRouter>
            )
        } else if (user === null) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/upload" component={Upload} />
                        <Route path="*" component={Notfound} />
                    </Switch>
                </BrowserRouter>
            )
        } else if (!user) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/upload" component={Upload} />
                        <Route path="*" component={Loading} />
                    </Switch>
                </BrowserRouter>
            )
        }
        
    }
}

export default App;
