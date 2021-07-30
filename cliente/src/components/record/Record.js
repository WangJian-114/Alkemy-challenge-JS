import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import recordContext from '../../context/record/recordContext';

const Record = ({record}) => {
    const { id, concept, amount, type, date } = record;
    const RecordContext = useContext(recordContext);
    const { deleteRecord } = RecordContext;

    const removeRecord = async (id) => {
        await deleteRecord(id);
    }

    return (  
        <>
            <tbody>
                <tr>
                    <th scope="row">{id}</th>
                    <td>{concept}</td>
                    <td>{amount}</td>
                    <td>{type}</td>
                    <td>{new Date(date).toLocaleDateString()}</td>
                    <td>
                        <Link
                            className="btn btn-primary mr-2"
                            to={`/record/${id}`}
                        ><i className="bi bi-pen"></i></Link>
                        <button
                            className="btn btn-danger"
                            onClick={() => removeRecord(id)}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </td>

                </tr>
            </tbody>
        </>
    );
}
 
export default Record;