import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import axios from 'axios';

class Nav extends Component {

    componentDidMount(){
        this.getUserInfo();
    }

    getUserInfo = () => {
        axios.get('/api/auth/me').then(response=>{
            let user = {
                username: response.data.username,
                profile_pic: response.data.profile_pic,
            }
            this.props.setUser(user)
        })
    }

    logout = () => {
        axios.post('/api/auth/logout').then(response=>{
            let user = {
                username: '',
                profile_pic: '',
            }
            this.props.setUser(user)
        })
    }

    render() {
        return (
            <div>
                Nav
                <img src={this.props.profile_pic} alt='icon' />
                {this.props.username}
                <Link to='/dashboard'>
                    <button>Home</button>
                </Link>
                <Link to='/new'>
                    <button>New Post</button>
                </Link>
                <Link to='/'>
                    <button onClick={this.logout}>Log out</button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        id: reduxState.mainReducer.id,
        username: reduxState.mainReducer.username,
        profile_pic: reduxState.mainReducer.profile_pic
    }
}

export default connect(mapStateToProps, { setUser })(Nav);