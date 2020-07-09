import firebaseConf from './firebase';
import firebase from 'firebase';

const authorizeMethods = {
  
  signup: (email, password, firstName, lastName, picture, setErrors, setToken) => {
    
    firebase.auth().createUserWithEmailAndPassword(email,password) 
      .then( async res => {
        // const token = await Object.entries(res.user)[5][1].b;
        // await setToken(token);
          //console.log(res)
        })
        .catch(err => {
        setErrors(prev => ([...prev, err.message]))
      })
    },
  signin: (email, password, setErrors, setToken) => {
    firebase.auth().signInWithEmailAndPassword(email, password) 
      .then( async res => {
        const token = await Object.entries(res.user)[5][1].b;
          await setToken(token);     
        })
        .catch(err => {
          setErrors(prev => ([...prev, err.message]));
        })
      },
      
  signout: (setErrors, setToken) => {
    firebase.auth().signOut().then( res => {
        setToken(null);
        localStorage.removeItem('token');
    })
    .catch(err => {
      //Signout should not give an error but just in case
      setErrors(prev => ([...prev, err.message]))
        //localStorage.removeItem('token');
        setToken(null);
        console.error(err.message);//Print error just to check what it is
    })
  },
}

export default authorizeMethods;