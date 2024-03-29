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
    var err = null;

    for(const field in newUser) {
      if(!newUser[field] && ([field] != 'picture' && [field] != 'pictureUrl' && [field] != 'employee')){
          err = {...err, [field]: 'Please provide a valid ' + field};
      }
    }
    
    if(!err){
      
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
      dispatch({ type: 'MISSING_DATA', err});
  }
}