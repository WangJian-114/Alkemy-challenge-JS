import React, {useContext} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '../../components/util/Alert';
import recordContext from '../../context/record/recordContext';

const FormAddRecord = () => {

    const RecordContext = useContext(recordContext);
    const { addRecord, getBalance } = RecordContext;

    // Formulario y Validacion con Formik y Yup
    const formik = useFormik({
        initialValues: {
            concept:'',
            amount:0,
            type:'income',
            date:''
        },

        validationSchema: Yup.object({
            concept : Yup.string().required('No puede ir vacio'),
            amount  : Yup.string().required('No puede ir vacio'),
            type    : Yup.string().required('No puede ir vacio'),
            date    : Yup.string().required('No puede ir vacio')
        }),

        onSubmit: async (data)=> {
            console.log(data)
            await addRecord(data);
            getBalance();
        }
    });

    return ( 
        <div className="row align-items-md-center align-items-sm-center justify-content-center">
    
            <div className="col-12 col-sm-7">
                <h4>Agregar un registros</h4>
                <hr />
                <form 
                    onSubmit={formik.handleSubmit}
                >
                    <input 
                        type="text"
                        placeholder="concepto"
                        className="form-control mb-3"
                        name="concept"
                        autoComplete="off"
                        value={formik.values.concept}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.concept && formik.errors.concept ? <Alert message={formik.errors.concept}/>: null }

                    <input 
                        type="text"
                        placeholder="Monto"
                        className="form-control mb-3"
                        name="amount"
                        autoComplete="off"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.amount && formik.errors.amount ? <Alert message={formik.errors.amount}/>: null }

                    <select
                        className="form-control mb-3"
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="income">Ingreso</option>
                        <option value="expenses">Egreso</option>
                    </select>

                    <input 
                        type="date"
                        className="form-control mb-3"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.date && formik.errors.date ? <Alert message={formik.errors.date}/>: null }

                    <button
                        type="submit"
                        className="btn mt-3 btn-block btn-outline-primary"
                    >
                        Agregar
                    </button>
                </form>
            </div>

        </div>
    );
}
 
export default FormAddRecord;