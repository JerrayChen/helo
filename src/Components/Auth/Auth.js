import React, { Component } from "react";
import { setUser } from '../../ducks/reducer';
import axios from "axios";
import { connect } from "react-redux";

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = () => {
        let { username, password } = this.state;
        axios.post('/api/auth/register', { username, password }).then(userInfo => {
            let user = {
                id: userInfo.data.userId,
                username: userInfo.data.username,
                profile_pic: userInfo.data.profile
            }
            this.props.setUser(user);
            this.props.history.push('/dashboard');
        }).catch(err => console.log(err.response))
    }

    login = () => {
        let { username, password } = this.state;
        axios.post('/api/auth/login', { username, password }).then(userInfo => {
            // console.log(userInfo);
            
            let user = {
                // id: userInfo.data.userId,
                username: userInfo.data.username,
                profile_pic: userInfo.data.profile
            }
            // console.log(user);
            
            this.props.setUser(user);
            this.props.history.push('/dashboard');
        }).catch(err => console.log(err.response))
    }

    render() {
        return (
            <div>
                <p>Login</p>
                Username: <input name='username' onChange={this.handleUserInput} />
                Password: <input name='password' onChange={this.handleUserInput} type='password' />
                <div>
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.register}>Register</button>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = function (reduxState) {
//     return {
//         id: reduxState.mainReducer.id,
//     }
// }

export default connect(null, { setUser })(Auth);