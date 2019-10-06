import React from 'react';
import EditForm from './editForm';
import DeleteForm from './deleteForm';

const Tbody = props => {
    const { data, categories, onSubmit, onDelete, paymentMethods = [], type } = props;
    return (
        <tbody>
            {data.map((d, index) => (
                < tr key={d.id} >
                    <td>{index + 1}</td>
                    <td>{d.date}</td>
                    <td>{d.amount}</td>
                    <td>{d.name}</td>
                    <td>{d.comment}</td>
                    <td>
                        <div className="btn-group">
                            <EditForm buttonLabel="Edit" index={index} data={d} categories={categories} onSubmit={onSubmit} paymentMethods={paymentMethods} type={type} />
                            <DeleteForm onDelete={onDelete} data={d} type={type} />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

export default Tbody;