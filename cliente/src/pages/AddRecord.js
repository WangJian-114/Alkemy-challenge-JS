import React from 'react';
import FormAddRecord from '../components/record/FormAddRecord';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

const AddRecord = () => {
    return ( 
        <>
            <Navbar />
            <div className="container">
                <h1>Presupuesto Personal</h1>
                <Link 
                    to='/records'
                    className="btn btn-outline-primary mr-3 mb-3"
                >Todos los registros</Link>

                <Link 
                    to='/add-record'
                    className="btn btn-outline-warning mr-3 mb-3"
                >Agregar registro</Link>
                <FormAddRecord />
            </div>
        </>
    );
}
 
export default AddRecord;