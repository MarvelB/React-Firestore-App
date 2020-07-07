import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import Main from "../Main/Main";

class SingUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        employee: false,
        picture: null,
        pictureUrl: null
    }

    handleSubmits = async (e) => {
        e.preventDefault();
        
        this.props.signUp(this.state)
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    displayPicture = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                picture: file,
                pictureUrl: reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    render() {
        const { authError, incompleteData } = this.props;

        return (
            <Main>
                <div className="container" onSubmit={this.handleSubmits}>
                    <form  className="white">
                        <h5 className="brown-text text-darken-3">Sign Up</h5>
                        <div className="input-field">
                            <input onChange={this.handleChange} id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                            <span className="red-text darken-text-4" name="errors">{incompleteData && incompleteData.email}</span>
                        </div>
                        <div className="input-field">
                            <input onChange={this.handleChange} id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                            <span className="red-text darken-text-4" name="errors">{incompleteData && incompleteData.password}</span>
                        </div>
                        <div className="input-field"> 
                            <input onChange={this.handleChange} id="firstName" type="text" className="validate" />
                            <label htmlFor="firstName">First Name</label>
                            <span className="red-text darken-text-4" name="errors">{incompleteData && incompleteData.firstName}</span>
                        </div>
                        <div className="input-field">
                            <input onChange={this.handleChange} id="lastName" type="text" className="validate" />
                            <label htmlFor="lastName">Last Name</label>
                            <span className="red-text darken-text-4" name="errors">{incompleteData && incompleteData.lastName}</span>
                        </div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Profile Picture</span>
                                <input type="file" onChange={this.displayPicture} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path" type="text" />
                            </div>
                        </div>
                        <img className="materialboxed" width="300" src={this.state.pictureUrl} />
                        <div className="input-field">
                            <button className="btn green z-depth-2" type="submit">Sign Up</button>
                        </div>
                        <span className="red-text darken-text-4" name="errors">{authError}</span>
                    </form>
                </div>
            </Main>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        incompleteData: state.auth.incompleteData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUp);