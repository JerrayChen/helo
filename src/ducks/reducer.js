// import axios from 'axios';
let initState = {
    id: null,
    username: '',
    profile_pic: '',
    // loading: false
}

const SET_USER = 'SET_USER';

// const LOGIN_USER = 'LOGIN_USER';
// const REGISTER_USER = 'REGISTER_USER';
// const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export function setUser(user) {
    const { id, username, profile_pic } = user
    return {
        type: SET_USER,
        payload: { id, username, profile_pic }
    }
}

// export function register(username, password) {
//     const user = { username, password }
//     return {
//         type: REGISTER_USER,
//         payload: axios.post('/api/auth/register', user)
//     }
// }

// export function login(username, password) {
//     const user = { username, password }
//     return {
//         type: LOGIN_USER,
//         payload: axios.post('/api/auth/login', user)
//     }
// }


export default function reducer(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case `${SET_USER}_FULFILLED`:
            return {
                ...state,
                id: payload.id,
                username: payload.username,
                profile_pic: payload.profile_pic,
            }
        // case `${REGISTER_USER}_FULFILLED`:
        //     return {
        //         ...state,
        //         id: payload.data.userId,
        //         username: payload.data.username,
        //         profile_pic: payload.data.profile,
        //     }
        // case `${LOGIN_USER}_FULFILLED`:
        //     return {
        //         ...state,
        //         id: payload.data.userId,
        //         username: payload.data.username,
        //         profile_pic: payload.data.profile,
        //     }
        // case `${LOGIN_USER}_REJECTED`:
        //     return {
        //         ...state,
        //         errorMsg: payload.response.data
        //     }
 
        default:
            return state;
    }

}