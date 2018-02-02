import firebase from 'firebase'
import contactInfoModel from './models/contactInfo'
import imgInfoModel from './models/imgInfo'

let database

export const getContactInfo = () => {
    database = firebase.database()

    return database.ref('/').once('value')
}

export const getImgs = (id) => {
    database = firebase.database()

    return database.ref(`/${id}`).once('value')
}

export const getImgUrls = (id) => {
    database = firebase.database()

    return database.ref(`/${id}`).child('images').once('value')
}

// info is object include all info
// callback = (key, error, message)
export const addContactInfo = (info, callback) => {
    database = firebase.database()

    let key = database.ref('/').push().key
    let model = contactInfoModel(
        key,
        info,
        firebase.database.ServerValue.TIMESTAMP
    )

    database.ref('/' + key).set(model)
        .then(() => {
            return callback(key, false, null)
        })
        .catch(error => {

            return callback(null, true, error)
        })
}

export const addImgUrl = (id, imgUrl) => {
    database = firebase.database()

    return new Promise((resolve, reject) => {

        database.ref(`/${id}`).once('value').then((img) => {

            let images = img.val().images || []
            let key = database.ref(`/${id}`).push().key

            images.push(imgInfoModel(key, imgUrl, firebase.database.ServerValue.TIMESTAMP))
            
            database.ref(`/${id}/images`).set(images)
                .then( res => {resolve(res)} )
                .catch( error => {reject(error)} )

        })

    })

}