import { 
    LOGIN_SUCCESSFUL,
    LOGOUT_SUCCESSFUL,
    GET_USER
   } from '../../types';



export const AuthReducer = ( state, action) => {
    switch(action.type) {
        case LOGIN_SUCCESSFUL:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                authenticated: true,
                loading:false,
            }
        
        case GET_USER:
            return {
                ...state,
                authenticated:true,
                loading:false
            }

        case LOGOUT_SUCCESSFUL:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                authenticated: false,
                loading:false,
        }

        default:
            return state;
    }
}