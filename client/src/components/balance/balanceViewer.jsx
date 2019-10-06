import React from 'react';
import Table from './table';
import Chart from './chart';
import DateChanger from './tableComponents/dateChanger';


const BalanceViewer = (props) => {
    const { data: incomeData, incomeCategories } = props.incomes;
    const { data: expenceData, expenceCategories, paymentMethods } = props.expences;
    const { onBalanceEdit, onBalanceDelete, getData } = props;

    return (
        <div className="row">
            <DateChanger getData={getData}/>
            <div className="col-6">
                <h3 className="text-center text-uppercase m-3">Przychody</h3>
                <Chart data={incomeData} />
                <Table
                    type="incomes"
                    data={incomeData}
                    categories={incomeCategories}
                    onSubmit={onBalanceEdit}
                    onDelete={onBalanceDelete} />
            </div>
            <div className="col-6">
                <h3 className="text-center text-uppercase m-3">Wydatki</h3>
                <Chart data={expenceData} />
                <Table
                    type="expences"
                    data={expenceData}
                    categories={expenceCategories}
                    paymentMethods={paymentMethods}
                    onSubmit={onBalanceEdit}
                    onDelete={onBalanceDelete} />
            </div>
        </div >
    );
}

export default BalanceViewer;