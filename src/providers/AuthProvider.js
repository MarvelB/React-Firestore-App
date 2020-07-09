import React, {useState} from 'react';
import authorizeMethods from '../Firebase/authmethods'

export const firebaseAuth = React.createContext()

const AuthProvider = (props) => {
  const initState = {email: '', password: '', firstName: '', lastName: '', picture: '', pictureUrl: ''}
  const [inputs, setInputs] = useState(initState);
  const [errors, setErrors] = useState([]);
  const [valErrors, setValErrors] = useState({});
  const [token, setToken] = useState(null);


  const handleSignup = () => {
    var err = null;
    
    for(const field in inputs) {
      if(!inputs[field] && ([field] != 'picture' && [field] != 'pictureUrl' && [field] != 'employee')){
          err = {...err, [field]: 'Please provide a valid ' + field};
      }
    }

    if(!err){
        setValErrors({});
        authorizeMethods.signup(inputs.email, inputs.password, inputs.firstName, inputs.lastName, inputs.picture, setErrors ,setToken);
    }else{
        setValErrors(prev => ({...err}));
    }
    //console.log(errors, token)
  }

  const handleSignin = () => {
    var err = null;

    for(const field in inputs) {
        if(!inputs[field] && ([field] == 'email' || [field] == 'password')){
            err = {...err, [field]: 'Please provide a valid ' + field};
        }
    }

    if(!err){
        setValErrors({});
        authorizeMethods.signin(inputs.email, inputs.password, setErrors, setToken);
    }else{
        setValErrors(prev => ({...err}));
    }
    //console.log(errors, token)
  }

  const handleSignout = () => {
    authorizeMethods.signout(setErrors, setToken)
  }

  return (
    <firebaseAuth.Provider
    value={{
      //replaced test with handleSignup
      handleSignup,
      handleSignin,
      token,
      inputs,
      setInputs,
      errors,
      valErrors,
      handleSignout,
    }}>
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;