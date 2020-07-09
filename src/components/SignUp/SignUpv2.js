import React, { useEffect, useState } from "react";
import Main from "../Main/Mainv2";
import { withRouter } from "react-router";
import { useUser, useAuth, useFirestore, useStorage } from 'reactfire'


const SingUp = (props) => {
    const initState = {email: '', password: '', firstName: '', lastName: '', picture: '', pictureUrl: '', employee: false}
    const [inputs, setInputs] = useState(initState);
    const [errors, setErrors] = useState([]);
    const [valErrors, setValErrors] = useState({});

    const firebase = useAuth();
    const firestore = useFirestore();
    const storage = useStorage().ref();
    var user = useUser();

    const handleSubmits = async (e) => {
        e.preventDefault();
        
        var err = null;

        for(const field in inputs) {
            if(!inputs[field] && ([field] != 'pictureUrl' && [field] != 'employee')){
                err = {...err, [field]: 'Please provide a valid ' + field};
            }
        }

        if(!err){
            setValErrors({});
            firebase.createUserWithEmailAndPassword(inputs.email, inputs.password)
            .then((res) => {
                setErrors([])

                if(inputs.picture){
                    console.log('picture')
                    //Store picture in firebase storage
                    storage.child(`users/${new Date().getTime()}`).put(inputs.picture).then((snapshot) => {
                        //Get downloadUrl for picture stored with above line
                        storage.child(snapshot.metadata.fullPath).getDownloadURL().then((url) => {
                            //Create new user
                            return firestore.collection('users').doc(res.user.uid).set({
                                firstName: inputs.firstName,
                                lastName: inputs.lastName,
                                initials: inputs.firstName[0] + inputs.lastName[0],
                                employee: inputs.employee,
                                picture: url
                            });
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                }else{
                    console.log(inputs)
                    //Create new user
                    return firestore.collection('users').doc(res.user.uid).set({
                        firstName: inputs.firstName,
                        lastName: inputs.lastName,
                        initials: inputs.firstName[0] + inputs.lastName[0],
                        employee: inputs.employee,
                        picture: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.message)
            })
        }else{
            setValErrors(err);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        setInputs(prev => ({...prev, [id]: value}))
    };

    const displayPicture = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setInputs(prev => ({
                ...prev,
                picture: file,
                pictureUrl: reader.result
            }))
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        if(user){
            props.history.push('/');
        }
    });

    return (
        <Main>
            <div className="container" onSubmit={handleSubmits}>
                <form  className="white">
                    <h5 className="brown-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <input onChange={handleChange} id="email" type="email" className="validate" value={inputs.email} />
                        <label htmlFor="email">Email</label>
                        <span className="red-text darken-text-4" name="errors">{valErrors && valErrors.email}</span>
                    </div>
                    <div className="input-field">
                        <input onChange={handleChange} id="password" type="password" className="validate" value={inputs.password} />
                        <label htmlFor="password">Password</label>
                        <span className="red-text darken-text-4" name="errors">{valErrors && valErrors.password}</span>
                    </div>
                    <div className="input-field"> 
                        <input onChange={handleChange} id="firstName" type="text" className="validate" value={inputs.firstName} />
                        <label htmlFor="firstName">First Name</label>
                        <span className="red-text darken-text-4" name="errors">{valErrors && valErrors.firstName}</span>
                    </div>
                    <div className="input-field">
                        <input onChange={handleChange} id="lastName" type="text" className="validate" value={inputs.lastName} />
                        <label htmlFor="lastName">Last Name</label>
                        <span className="red-text darken-text-4" name="errors">{valErrors && valErrors.lastName}</span>
                    </div>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Profile Picture</span>
                            <input type="file" onChange={displayPicture} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path" type="text" />
                        </div>
                    </div>
                    <img className="materialboxed" width="300" src={inputs.pictureUrl} />
                    <span className="red-text darken-text-4" name="errors">{valErrors && valErrors.picture}</span>
                    <div className="input-field">
                        <button className="btn green z-depth-2" type="submit">Sign Up</button>
                    </div>
                    <span className="red-text darken-text-4" name="errors">{errors}</span>
                </form>
            </div>
        </Main>
    );
};

export default withRouter(SingUp);