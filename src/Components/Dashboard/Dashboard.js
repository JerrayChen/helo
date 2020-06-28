import React, { Component } from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            myPost: true,
            postList: [],
        }
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    handleUserInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getPosts = () => {
        // axios.get(`/api/posts/${this.props.userid}?search=${this.state.search}&userposts=${this.state.myPost}`)
        axios.get(`/api/posts?search=${this.state.search}&userposts=${this.state.myPost}`)
            .then(response => {
                console.log(response.data);

                this.setState({
                    postList: response.data
                })
            })
    }

    search = () => {
        this.getPosts()
    }
    reset = () => {
        this.setState({
            search: ''
        }, this.getPosts)
    }
    changeMyPost = (e) => {
        this.setState({
            myPost: e.target.checked
        })
    }
    render() {
        let postList = this.state.postList.map((e, i) => {
            return (
                <div key={i}>
                    <Link to={`/post/${e.id}`}>
                        <div>Title: {e.title}</div>
                        <div>Author: {e.author}</div>
                        <div><img src={e.authorpic} alt={e.username} /> </div>
                    </Link>
                </div>
            )
        })
        return (
            <div>
                Dashboard
                <input name='search' onChange={this.handleUserInput} value={this.state.search} />
                <button onClick={this.search}>Search</button>
                <button onClick={this.reset}>Reset</button>
                <input name='myPost' onChange={this.changeMyPost} type='checkbox' checked={this.state.myPost} />My Post
                {postList}
            </div>
        );
    }
}

// const mapStateToProps = (reduxState) => {
//     return {
//         userid: reduxState.mainReducer.id
//     }
// }

// export default connect(mapStateToProps)(Dashboard);
export default Dashboard;