const TableRecord = ({record}) => {

    const { id, concept, amount, type, createdAt } = record;
    return (  
        <>
            <tbody>
                <tr>
                    <th scope="row">{id}</th>
                    <td>{concept}</td>
                    <td>{amount}</td>
                    <td>{type}</td>
                    <td>{new Date(createdAt).toLocaleDateString()} {new Date(createdAt).toLocaleTimeString() }</td>
                </tr>
            </tbody>
        </>
    );
}
 
export default TableRecord;