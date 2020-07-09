import firebaseConf from './firebase';
import firebase from 'firebase';

const nailsMethods = {
    getNailStyles: (setErrors, setNails) => {
        firebase.firestore().collection('nails')
        .onSnapshot((snapshot) => {
            console.log(snapshot);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

export default nailsMethods;