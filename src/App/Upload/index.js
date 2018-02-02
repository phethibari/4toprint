import React, {Component} from 'react'

import FileUpload from '../../firebase/firebaseUpload'

import Navbar from '../Navbar'

import { addContactInfo, addImgUrl } from "../../firebase/firebaseInfo";


export default class Upload extends Component {

    state = {
        files: null
    }

    componentDidMount() {
        console.log('refs is ', this.refs)
    }

    handleFileUpload(e) {
        e.preventDefault()
        console.log('all files are ', e.target.files)

        let files = e.target.files
        // console.log('file is ', file)

        this.setState({ files: files })
    }

    handleSubmit(e) {
        e.preventDefault()

        let info = {
            name: this.refs['name'].value,
            mobile: this.refs['mobile'].value,
            email: this.refs['email'].value,
            address: this.refs['address'].value
        }

        addContactInfo(info, (key, error, message) => {
            
            if (error) {
                console.log('error add is ', message)
            }

            let contactName = this.refs['name'].value + ':_:' + this.refs['mobile'].value

            const files = this.state.files
            if (files !== null) {
                for (let i = 0; i < files.length; i++) {
                    let file = files[i]
                    
                    FileUpload(file, contactName, (snapshot, error, message) => {

                        console.log('into fileUpload, snapshot is ', snapshot)

                        addImgUrl(key, snapshot.downloadURL)
                            .then(() => {
                                console.log('finished ', i)
                            })
                            .catch(error => {
                                console.log('error is ', error)
                            })

                    })

                }
            }

            this.refs['name'].value = ''
            this.refs['mobile'].value = ''
            this.refs['email'].value = ''
            this.refs['address'].value = ''

            console.log('success finished all!')
        })

    }

    render() {
        return (
            <Navbar>
                <div className="container">
                    <div className="row justify-content-center align-self-center" style={{paddingTop: 30 + 'px'}}>
                        <h4 className="mb-3">Billing address</h4>
                    </div>
                    <div className="row justify-content-center align-self-center">
                        <form className="col-md-7" >
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" className="form-control" ref="name" placeholder="Name LastName" />
                            </div>

                            <div className="mb-3">
                                <label>Mobile Number</label>
                                <input type="text" className="form-control" ref="mobile" placeholder="12345678" />
                            </div>

                            <div className="mb-3">
                                <label>Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" ref="email" placeholder="mail@email.com" />
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <input type="text" className="form-control" ref="address" placeholder="123 Vientiane, Laos" />
                            </div>

                            <div className="mb-3">
                                <label>Upload Files</label>
                                <input type="file" multiple accept="image/*" className="form-control" required onChange={(e) => {this.handleFileUpload(e)}} />
                            </div>

                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" onClick={(e) => {this.handleSubmit(e)}} >Submit Post</button>
                        </form>
                    </div>
                </div>
            </Navbar>
        )
    }
}