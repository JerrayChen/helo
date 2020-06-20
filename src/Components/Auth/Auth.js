import React, { Component } from "react";

class Auth extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                <p>Login</p>
                Username: <input name='username' onChange={this.handleUserInput}/>
                Password: <input name='password' onChange={this.handleUserInput} type='password'/>
                <div>
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>
        )
    }
}

export default Auth;