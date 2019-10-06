import React from 'react';
import Tbody from './tableComponents/tbody';

const Table = props => {
    const { data, categories, onSubmit, onDelete, paymentMethods = [], type } = props
    return (
        <div className="col-6 m-3">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Data</th>
                        <th>Kwota</th>
                        <th>Kategoria</th>
                        <th>Komentarz</th>
                        <th>Akcja</th>
                    </tr>
                </thead>
                <Tbody
                    data={data}
                    categories={categories}
                    paymentMethods={paymentMethods}
                    type={type}
                    onSubmit={onSubmit}
                    onDelete={onDelete} />
            </table>
        </div>

    );
}

export default Table;