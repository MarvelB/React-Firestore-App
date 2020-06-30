import React, { Component } from "react";
import Main from "../Main/Main";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        const { auth } = this.props;

        if(auth.uid) {
            this.props.history.push('/');
        }
    };

    handleSubmits = async (e) => {
        e.preventDefault();
        
        this.props.signIn(this.state);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    render() {
        const { authError } = this.props;

        return (
            <Main>
                <div className="container">
                    <form onSubmit={this.handleSubmits} className="white">
                        <h5 className="brown-text text-darken-3"> Log In</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input onChange={this.handleChange} id="email" type="email" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input onChange={this.handleChange} id="password" type="password" />
                        </div>
                        <div className="input-field">
                            <button className="btn green z-depth-2">Login</button>
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
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Login);