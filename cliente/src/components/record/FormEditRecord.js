import React, {useContext, useEffect} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '../../components/util/Alert';
import recordContext from '../../context/record/recordContext';

const FormEditRecord = ({id}) => {

    const RecordContext = useContext(recordContext);
    const { editRecord, selectedRecord, getRecord, getBalance } = RecordContext;
  

    const schemaValidacion =  Yup.object({
        concept : Yup.string().required('No puede ir vacio'),
        amount  : Yup.string().required('No puede ir vacio'),
        type    : Yup.string().required('No puede ir vacio'),
        date    : Yup.string().required('No puede ir vacio'),
    });

    useEffect(()=> {
        getRecord(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(Object.keys(selectedRecord).length === 0) return 'cargando...'

    return ( 
        <div className="row align-items-md-center align-items-sm-center justify-content-center">
            <div className="col-12 col-sm-7">
                <h4>Editar un registros</h4>
                <hr />
                <Formik
                    enableReinitialize
                    initialValues={selectedRecord}
                    validationSchema={schemaValidacion}
                    onSubmit={ async (info) => {
                        console.log(info);
                        await editRecord(id, info);
                        getBalance();
                    }}
                >
                    {props => {
                        return (
                            <form 
                                    onSubmit={props.handleSubmit}
                                >
                                    <input 
                                        type="text"
                                        placeholder="concepto"
                                        className="form-control mb-3"
                                        name="concept"
                                        autoComplete="off"
                                        value={props.values.concept}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    { props.touched.concept && props.errors.concept ? <Alert message={props.errors.concept}/>: null }

                                    <input 
                                        type="text"
                                        placeholder="Monto"
                                        className="form-control mb-3"
                                        name="amount"
                                        autoComplete="off"
                                        value={props.values.amount}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    { props.touched.amount && props.errors.amount ? <Alert message={props.errors.amount}/>: null }

                                    <select
                                        className="form-control mb-3"
                                        name="type"
                                        value={props.values.type}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        disabled
                                    >
                                        <option value="income">Ingreso</option>
                                        <option value="expenses">Egreso</option>
                                    </select>

                                    <input 
                                        type="date"
                                        className="form-control mb-3"
                                        name="date"
                                        value={(props.values.date).split('T')[0]}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    { props.touched.date && props.errors.date ? <Alert message={props.errors.date}/>: null }

                                    <button
                                        type="submit"
                                        className="btn mt-3 btn-block btn-outline-primary"
                                    >
                                        Editar
                                    </button>
                            </form>
                        )
                    }}
                </Formik>
               
            </div>
        </div>

   
    );
}
 
export default FormEditRecord;