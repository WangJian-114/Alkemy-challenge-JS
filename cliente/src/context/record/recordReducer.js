import { 
    GET_LAST_TEN,
    GET_RECORD,
    GET_RECORDS,
    GET_BALANCE,
    ADD_RECORD, 
    DELETE_RECORDS,
    EDIT_RECORD
   } from '../../types';



export const RecordReducer = ( state, action) => {
    switch(action.type) {
        case GET_LAST_TEN:
            return {
                ...state,
                lastTen: action.payload,
                incomeRecords:action.payload.filter(record => record.type === 'income'),
                expensesRecords:action.payload.filter(record => record.type === "expenses"),
            }

        case GET_RECORD:
            return {
                ...state,
                selectedRecord:action.payload
            }

        case GET_RECORDS:
            return {
                ...state,
                records: action.payload,
                incomeRecords:action.payload.filter(record => record.type === 'income'),
                expensesRecords:action.payload.filter(record => record.type === "expenses"),
            }

        case GET_BALANCE:
            let budget= 0;
            let spending=0;
            state.incomeRecords.forEach( record => {
                budget += record.amount; 
            });
            state.expensesRecords.forEach( record => {
                spending += record.amount; 
            });

            return{
                ...state,
                budget,
                remaining:  budget-spending,
            }

        case ADD_RECORD:
            return {
                ...state,
                records: [...state.records, action.payload],
                incomeRecords: [...state.incomeRecords, action.payload],
                expensesRecords: [...state.expensesRecords, action.payload]
            }

        case EDIT_RECORD:
            return {
                ...state,
                records : state.records.map(record => record.id === action.payload.id ? action.payload : record),
                incomeRecords:state.incomeRecords.map(record => record.id === action.payload.id ? action.payload : record),
                expensesRecords:state.expensesRecords.map(record => record.id === action.payload.id ? action.payload : record)
            }

        case DELETE_RECORDS:
            return {
                ...state,
                records : state.records.filter(record => record.id !== action.payload),
                incomeRecords:state.incomeRecords.filter(record => record.id !== action.payload),
                expensesRecords:state.expensesRecords.filter(record => record.id !== action.payload)
            }

        default:
            return state;
    }
}