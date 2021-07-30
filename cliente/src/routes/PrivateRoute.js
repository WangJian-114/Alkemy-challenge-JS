import React, {useContext, useEffect} from 'react';
import { Redirect, Route} from 'react-router-dom';

import authContext from '../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    
    const AuthContext = useContext(authContext);
    const { authenticated, loading, userAuthenticated } = AuthContext;

    useEffect(() =>{
        userAuthenticated() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return ( 
        <Route { ...props } render={ props =>!authenticated && loading
            ? (
                <Redirect to="/" />
                )

            : (
                <Component { ...props} />
            )} />
    );
}
 
export default PrivateRoute;
