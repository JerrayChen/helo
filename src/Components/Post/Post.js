import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'


class Post extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPic: '',
            authorId: null,
            // add since userid is removed from reducer
            userid: null,
        }
    }

    componentDidMount() {
        axios.get(`/api/post/${this.props.match.params.postid}`).then(response => {
            // console.log(response.data);
            
            this.setState({
                title: response.data.title,
                img: response.data.img,
                content: response.data.content,
                author: response.data.author,
                authorPic: response.data.authorpicture,
                authorId: response.data.authorid,
            });

        })
        axios.get('/api/auth/me').then(response=>{
            this.setState({
                userid: response.data.id
            });
        })
    }

    delete = () => {
        axios.delete(`/api/post/${this.props.match.params.postid}`).then(()=>{
            this.props.history.push('/dashboard');
        })
    }

    render() {
        // const deleteBtn = this.state.authorId===this.props.userid?
        const deleteBtn = this.state.authorId===this.state.userid?
        (<button onClick={this.delete}>Delete Post</button>):
        null;
        return (
            <div>
                Post
                {deleteBtn}
                <div>Title: {this.state.title}</div>
                <div><img src={this.state.img} alt='post_pic' /></div>
                <div>Content: {this.state.content}</div>
                <div>Author: <img src={this.state.authorPic} alt='author_pic' /> {this.state.author} </div>

            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        userid: reduxState.mainReducer.id
    }
}

export default connect(mapStateToProps)(Post);