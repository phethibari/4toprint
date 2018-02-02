import firebase from 'firebase'

// callback = (snapshot, error, message)
export default (file, contactName, callback) => {

    const storageRef = firebase.storage().ref()

    // file name
    let timeStamp = Math.floor((new Date).getTime() / 1000)
    let fileName = timeStamp + ':_:' + file.name

    let metadata = {
        contentType: file.type
    }

    console.log('contactName is ', contactName)
    console.log('filename is ', fileName)
    console.log('path is: ' + contactName + '/' + fileName)

    // save in contactName/ dir with name is fileName
    storageRef.child(contactName + '/' + fileName)
        .put(file, metadata).then((snapshot) => {
            console.log('uploaded! ', snapshot.totalBytes, 'bytes.')
            console.log('snapshot.metadata is ', snapshot.metadata)

            let url = snapshot.downloadURL
            console.log('file available at ', url)

            console.log('snapshot is ', snapshot)
            
            return callback(snapshot, false, null)
        }).catch((error) => {
            console.log('upload failed: ', error)

            return callback(null, true, error)
        })

}

// let ts = Math.floor((new Date).getTime() / 1000)
        // console.log('ts is ', ts)
        // console.log('epoch2date is ', this.epoch2date(ts))

// epoch2date(myEpoch) {
    //     var myDate = new Date(myEpoch * 1000);
    //     return myDate.toGMTString() + "<br>" + myDate.toLocaleString()
    // }