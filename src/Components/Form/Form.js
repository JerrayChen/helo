import React, { Component } from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';

class Form extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img:'',
            content:''
        }
    }

    post = () => {
        let body = {
            title: this.state.title,
            img: this.state.img,
            content: this.state.content
        }
        // axios.post(`/api/post/${this.props.authorid}`, body).then(()=>{
        axios.post(`/api/post`, body).then(()=>{
            this.props.history.push('/dashboard');
        })
    }

    handleUserInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                Form
                <div>Title: <input name='title' onChange={this.handleUserInput} /></div>
                <div>Image URL: <input name='img' onChange={this.handleUserInput}/></div>
                <img src={this.state.img} alt='preview'/>
                <div>content: <input name='content' onChange={this.handleUserInput}/></div>
                <button onClick={this.post} >Post</button>
            </div>
        );
    }
}

// const mapStateToProps = (reduxState) => {
//     return{
//         authorid: reduxState.mainReducer.id
//     }
// }

// export default connect(mapStateToProps)(Form);
export default Form;