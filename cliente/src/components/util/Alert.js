import React from 'react';
import './alert.css';

const Alert = ({ message }) => {
    return ( 
        <div className="custom-alert custom-alert-error"> {message} </div>
    );
}
 
export default Alert;