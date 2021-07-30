import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Balance from "../components/Balance";
import ListRecord from "../components/record/ListRecords";
import Navbar from "../components/Navbar";
import recordContext from '../context/record/recordContext';

const Records = () => {

    const [ category, setCategory ] = useState('all');

    const RecordContext = useContext(recordContext);
    const { records, incomeRecords, expensesRecords, 
            getRecords
            } = RecordContext;

    useEffect(() => {
        getRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if(!records) return 'cargando...';

    return ( 
        <>
            <Navbar />
  
            <div className="container">
                <Link 
                    to='/home'
                    className="text-decoration-none"
                ><h1>Presupuesto Personal</h1></Link>
                <Link 
                    to='/records'
                    className="btn btn-outline-primary mr-3 mb-3"
                >Todos los registros</Link>

                <Link 
                    to='/add-record'
                    className="btn btn-outline-warning mr-3 mb-3"
                >Agregar registro</Link>
                
                <Balance />

                <button
                    className="btn btn-outline-info mr-3 mb-3"
                    onClick={() => setCategory('all')}
                >
                    Todos
                </button>

                <button
                    className="btn btn-outline-info mr-3 mb-3"
                    onClick={() => setCategory('expenses')}
                >
                    Egreso
                </button>

                <button
                    className="btn btn-outline-info mr-3 mb-3"
                    onClick={() => setCategory('income')}
                >
                    Ingreso
                </button>

                { category === 'expenses'?(
                    <ListRecord
                        records={expensesRecords}
                    />
                ): null }

                { category === 'income'?(
                    <ListRecord
                        records={incomeRecords}
                    />
                ): null }

                { category === 'all'?(
                    <ListRecord
                    records={records}
                    />
                ): null }
            </div>
        </>
    );
}
 
export default Records;