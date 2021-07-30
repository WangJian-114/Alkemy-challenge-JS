import React,{useReducer} from 'react';
import Swal from 'sweetalert2';
import AuthContext from './authContext';
import { AuthReducer } from './authReducer';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    GET_USER,
    LOGIN_SUCCESSFUL,
    LOGOUT_SUCCESSFUL
   } from '../../types';



const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        loading: true,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Cuando el usuario inicia sesión
    const logIn = async data => {
        try {
            const res = await axiosClient.post('/auth/login', data);
            console.log(res);
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload:res.data.token
            });
            tokenAuth(res.data.token);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bienvenido!',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o Password incorrecto',
            });
        }
    }

    const newAccount = async data => {
        try {
            const res = await axiosClient.post('/user', data);
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Oops...',
                text: 'Usuario fue creado correctamente',
            });
        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error',
            });
        }
    }

    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }
        try {
            await axiosClient.get('/auth/user');
            // console.log(respuesta);
            dispatch({
                type: GET_USER,
            });

        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error',
            });
        }

 
    }

    // Cierra la sesion del usuario
    const logOut = () => {
        try {
            dispatch({
                type:LOGOUT_SUCCESSFUL
            })  
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error!',
            })
        }
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                loading: state.loading,
                userAuthenticated,
                logIn,
                logOut,
                newAccount
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;