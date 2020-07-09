import React, { useContext, useEffect, useState } from "react";
import Main from "../Main/Mainv2";
import {withRouter} from 'react-router-dom';
import { useUser, useAuth } from 'reactfire';

const Login = (props) => {
    const initState = {email: '', password: ''}
    const [inputs, setInputs] = useState(initState);
    const [errors, setErrors] = useState([]);
    const [valErrors, setValErrors] = useState({});

    const firebase = useAuth();
    var user = useUser();

    const handleSubmits = async (e) => {
        e.preventDefault();
        
        var err = null;

        for(const field in inputs) {
            if(!inputs[field] && ([field] != 'picture' && [field] != 'pictureUrl' && [field] != 'employee')){
                err = {...err, [field]: 'Please provide a valid ' + field};
            }
        }

        if(!err){
            setValErrors({});
            firebase.signInWithEmailAndPassword(inputs.email, inputs.password)
            .then((res) => {
                setErrors([])
            })
            .catch((err) => {
                setErrors(err.message)
            })
        }else{
            setValErrors(prev => ({...err}));
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target

        setInputs(prev => ({...prev, [id]: value}))
    };

    useEffect(() => {
        if(user){
            props.history.push('/');
        }
    });

    return (
        <Main>
            <div className="container">
                <form onSubmit={handleSubmits} className="white">
                    <h5 className="brown-text text-darken-3"> Log In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} id="email" type="email" value={inputs.email} />
                        <span className="red-text darken-text-4" name="errors">{valErrors && valErrors.email}</span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} id="password" type="password" value={inputs.password} />
                        <span className="red-text darken-text-4" name="errors">{valErrors && valErrors.password}</span>
                    </div>
                    <div className="input-field">
                        <button className="btn green z-depth-2">Login</button>
                    </div>
                    <span className="red-text darken-text-4" name="errors">{errors}</span>                    
                </form>
            </div>
        </Main>
    );
};

export default withRouter(Login);