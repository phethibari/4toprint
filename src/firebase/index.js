import firebase from 'firebase'
import { clientConfig } from './config'

if (!firebase.apps.length) {
    firebase.initializeApp(clientConfig)
}

const auth = firebase.auth
const provider = new firebase.auth.FacebookAuthProvider()

export const authChecking = async (callback) => {
    await auth().onAuthStateChanged((user) => {

        return callback(user)
    })
}

export const authLogin = async (callback) => {
    const result = await auth().signInWithPopup(provider)

    return callback(result)
}

export const authLogout = async () => {
    await auth().signOut()
}