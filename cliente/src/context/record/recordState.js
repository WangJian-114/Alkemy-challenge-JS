import React,{useReducer} from 'react';
import Swal from 'sweetalert2';
import RecordContext from './recordContext';
import { RecordReducer } from './recordReducer';

import axiosClient from '../../config/axios';

import { 
    GET_LAST_TEN,
    GET_RECORD,
    GET_RECORDS,
    GET_BALANCE,
    ADD_RECORD,
    DELETE_RECORDS,
    EDIT_RECORD
   } from '../../types';



const RecordState = props => {

    const initialState = {
        budget:0,
        lastTen:[],
        records:[],
        selectedRecord:{},
        incomeRecords:[],
        expensesRecords:[],
        remaining:0
    }

    const [state, dispatch] = useReducer(RecordReducer, initialState);

    const getRecords = async () => {
        try {
            const res = await axiosClient.get('/record/records');
            // console.log(res);
            dispatch({
                type: GET_RECORDS,
                payload:res.data.records
            });
            getBalance();
        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al llamar la BD',
            });
        }
    }

    const getRecord = async (id) => {
        try {
            const res = await axiosClient.get(`/record/${id}`);
            console.log(res);
            dispatch({
                type: GET_RECORD,
                payload:res.data.record
            });
        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o Password incorrecto',
            });
        }
    }
 
    // Cuando el usuario inicia sesión
    const getLastTenRecords = async () => {
        try {
            const res = await axiosClient.get('/record/lastTenRecords');
            console.log(res);
            dispatch({
                type: GET_LAST_TEN,
                payload:res.data.records
            });
        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o Password incorrecto',
            });
        }
    }

    const addRecord = async (data) => {
        try {
            const res = await axiosClient.post('/record', data);
            console.log(res);
            dispatch({
                type: ADD_RECORD,
                payload:res.data.record
            });
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Se agrego correctamente',
            });
        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error',
            });
        }
    }

    const editRecord = async (id, data) => {
        try {
            const res = await axiosClient.put(`/record/${id}`, data);
            console.log(res);
            dispatch({
                type: EDIT_RECORD,
                payload:res.data.record
            });
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Se actualizo correctamente',
            });
        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error',
            });
        }
    }

    const deleteRecord = (id) => {
        try {
            // console.log(id);
            Swal.fire({
                title: 'Estas seguro?',
                text: "Una vez eliminando no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminalo!'
              }).then((result) => {
                if (result.isConfirmed) {
                  axiosClient.delete(`/record/${id}`);
                  dispatch({
                    type: DELETE_RECORDS,
                    payload: id
                  });
                  getBalance();
                  Swal.fire(
                    'Eliminado!',
                    'El registro fue eliminado.',
                    'success'
                  )
                }
              })

        } catch (error) {
            console.log(error);   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error',
            });   
        }
    }

    const getBalance = () => {
        try {
            dispatch({
                type:GET_BALANCE,
            });  
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error!',
            })
        }
    }


    return(
        <RecordContext.Provider
            value={{
                budget: state.budget,
                remaining: state.remaining,
                lastTen: state.lastTen,
                records: state.records,
                selectedRecord: state.selectedRecord,
                loading: state.loading,
                incomeRecords: state.incomeRecords,
                expensesRecords: state.expensesRecords,
                getBalance,
                getRecord,
                getRecords,
                getLastTenRecords,
                addRecord,
                editRecord,
                deleteRecord
            }}
        >
            {props.children}
        </RecordContext.Provider>
    )
}
export default RecordState;