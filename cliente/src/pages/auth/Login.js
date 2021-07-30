import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
// Libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Components
import Alert from '../../components/util/Alert';
import Spinner from '../../components/util/Spinner';

// Context
import authContext from '../../context/auth/authContext';


const Login = () => {

    const history = useHistory();

    const AuthContext = useContext(authContext);
    const { logIn, authenticated } = AuthContext;

    const [loading, setLoading] = useState(false);

    // Formulario y Validacion con Formik y Yup
    const formik = useFormik({
        initialValues: {
            email:'test1@test.com',
            password:'1234567',
        },

        validationSchema: Yup.object({
            email   : Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('El password no puede ir vacio')
        }),

        onSubmit: (data)=> {
            Login(data);
        }
    });

    const Login = async (data) => {
        setLoading(true);
        await logIn(data);
        setLoading(false);
    }

    useEffect(()=> {
        if(authenticated) {
            history.push('/home');
        }
        // eslint-disable-next-line
    },[authenticated, history]);

    return ( 
        <>
            <div className="bg-secondary">
                <div className="d-flex height justify-content-center align-items-center">
                    <div className="rounded bg-white responsive">
                        <h1 className="text-black">Iniciar Sesion</h1>
                        { loading? <Spinner /> : null }
                        <form
                            className="m-5"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="form-group d-flex justify-content-between align-items-center">
                                <label 
                                    htmlFor="email"
                                    className="m-0 mr-5"
                                >
                                    Email:
                                </label>
                                <input 
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Tu Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            { formik.touched.email && formik.errors.email ? <Alert message={formik.errors.email}/>: null }

                            <div className="form-group d-flex justify-content-between align-items-center">
                                <label 
                                    htmlFor="password"
                                    className="m-0 mr-3"
                                >
                                    Password:
                                </label>
                                <input 
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Tu Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            { formik.touched.password && formik.errors.password ? <Alert message={formik.errors.password}/>: null }

                            <div className="d-block">
                                <input 
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    value="ENVIAR"
                                />
                            </div>
                            <Link 
                                to="/new-account"
                                className="d-block text-center mt-3"
                            >
                                NUEVA CUENTA
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Login;