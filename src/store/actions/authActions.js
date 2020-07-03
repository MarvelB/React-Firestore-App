export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS', success: 'Signed In'});
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            firebase.logout();
            dispatch({ type: 'SIGOUT_SUCCESS'});
        });
    }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const storage = firebase.storage().ref();
    const firestore = getFirestore();
    var err = {
      message: ''
    }

    if(!newUser.email)
        err.message = "Provide an email address";
    else if(!newUser.password)
        err.message = "Provide a password";
    else if(!newUser.firstName)
        err.message = "Provide your first name";
    else if(!newUser.lastName)
        err.message = "Provide your last name";
    else
        err.message = "";

    if(!err.message){
      
      firebase.auth().createUserWithEmailAndPassword(
        newUser.email, 
        newUser.password        
      ).then(resp => {

        if(newUser.picture){
          
          storage.child(`users/${new Date().getTime()}`).put(newUser.picture).then((snapshot) => {
            storage.child(snapshot.metadata.fullPath).getDownloadURL().then((url) => {
              return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                employee: newUser.employee,
                picture: url
              });
            })
          }).catch((err) => {
            console.log(err);
          })
        } else{
          return firestore.collection('users').doc(resp.user.uid).set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            employee: newUser.employee,
          });
        }
        
      }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS', success: 'Signed up' });
      }).catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err});
      });
    }
    else
      dispatch({ type: 'SIGNUP_ERROR', err});
  }
}