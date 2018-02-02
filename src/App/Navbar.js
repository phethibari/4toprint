import React, { Component } from 'react';
import './style.css'

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top" >
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/upload">Upload Images</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <a className="dropdown-item" href="">Action</a>
                                <a className="dropdown-item" href="">Another action</a>
                                <a className="dropdown-item" href="">Something else here</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div style={{paddingTop: 60 + 'px'}}>
                    {this.props.children}
                </div>
                
            </div>
        )
    }
}

export default Navbar;
