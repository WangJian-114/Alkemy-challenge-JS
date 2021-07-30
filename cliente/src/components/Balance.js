import React, {useContext} from 'react';
import recordContext from '../context/record/recordContext';


const Balance = () => {

    const RecordContext = useContext(recordContext);
    const { budget, remaining } = RecordContext;

    return ( 
        <>
            <div className="alert alert-primary">
                <h3>Presupuesto : $ {budget}</h3>
            </div>

            <div className="alert alert-danger">
                <h3>Restante : $ {remaining}</h3>
            </div>
        </>
     );
}
 
export default Balance;

// className={revisarPresupuesto(presupuesto, restante)}