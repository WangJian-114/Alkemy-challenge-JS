import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Balance from "../components/Balance";
import TableRecord from "../components/record/TableRecord";
import Navbar from "../components/Navbar";
import recordContext from '../context/record/recordContext';

const Home = () => {

    const RecordContext = useContext(recordContext);
    const { lastTen, getLastTenRecords, getRecords } = RecordContext;

    const fetData = () => {
        getLastTenRecords()
        getRecords(); 
    }

    useEffect(() => {
        fetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                
                <Balance />
                <div className="alert alert-warning" role="alert">
                    Los ultimos registros
                </div>
                <table className="table table-dark">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Concepto</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    {
                        lastTen?.length !== 0 
                        ?
                            (   lastTen?.map(record => (
                                    <TableRecord
                                        key={record.id} 
                                        record={record}
                                    />
                                ))
                            )
                        : null
                    }
                </table>        
            </div>
        </>
    );
}
 
export default Home;