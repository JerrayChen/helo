// import axios from 'axios';
let initState = {
    // id: null,
    username: '',
    profile_pic: '',
}

const SET_USER = 'SET_USER';

// const LOGIN_USER = 'LOGIN_USER';
// const REGISTER_USER = 'REGISTER_USER';
// const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export function setUser(user) {
    // const { id, username, profile_pic } = user
    const { username, profile_pic } = user
    // console.log('reducer');
    
    return {
        type: SET_USER,
        payload: { 
            // id, 
            username, 
            profile_pic,
        }
    }
}


export default function reducer(state = initState, action) {
    const { type, payload } = action;
    // console.log(type);
    
    switch (type) {
        
        
        case SET_USER:
            // console.log('payload');
            
            return {
                ...state,
                // id: payload.id,
                username: payload.username,
                profile_pic: payload.profile_pic,
            }
 
        default:
            return state;
    }

}