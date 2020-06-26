import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {

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
                    <button>Log out</button>
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

export default connect(mapStateToProps)(Nav);