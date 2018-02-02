import React, {Component} from 'react'
import './style.css'

// -L3l5vRlawDGBA9vYqVm
    // address: "a1"
    // email: "a1@a1.com"
    // id: "-L3l5vRlawDGBA9vYqVm"
    // mobile: "a1"
    // name: "a1"
    // timestamp: 1516947355786

export default class SingleList extends Component {

    epoch2date(myEpoch) {
        var myDate = new Date(myEpoch);
        
        return myDate.toLocaleString()
    }


    render() {
        // console.log('into singleList', this.props.info)
        const info = this.props.info

        return (
            <div className="card" style={{marginBottom: 30 + 'px'}}>
                <h5 className="card-header">
                    <b>Name: {info.name}</b>
                </h5>
                <div className="card-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <p className="card-text">
                                    <b>mobile: </b> {info.mobile}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p className="card-text">
                                    <b>email: </b> {info.email}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p className="card-text">
                                    <b>time: </b> {this.epoch2date(info.timestamp)}
                                </p>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <a className="btn btn-primary" href={`/admin/review/${info.id}`} >See details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}