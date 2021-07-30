import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// Context
import authContext from '../context/auth/authContext';

const Navbar = () => {

    const history = useHistory();
    const AuthContext = useContext(authContext);
    const { logOut } = AuthContext;


    const logout = async () => { 
        await logOut();
        history.push('/')
    };

    return ( 
        <>
            <div className="d-flex justify-content-end m-3">
                <button
                    className="btn btn-danger"
                    onClick={logout}
                >Cerrar sesion</button>
            </div>
        </>
    );
}
 
export default Navbar;