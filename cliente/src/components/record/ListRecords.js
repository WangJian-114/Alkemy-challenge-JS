import Record from './Record';

const ListRecords = ({ records }) => {
    return ( 
        <table className="table table-dark">
            <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Concepto</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            {
                records?.length !== 0
                ?
                    (   records?.map(record => (
                            <Record
                                key={record.id} 
                                record={record}
                            />
                        ))
                    )
                : null
            }
        </table>  
    );
}
 
export default ListRecords;