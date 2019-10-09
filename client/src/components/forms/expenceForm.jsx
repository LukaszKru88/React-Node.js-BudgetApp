import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from './formsComponents/form';
import Joi from 'joi-browser';
import Input from './formsComponents/input';
import Select from './formsComponents/select';
import { generateDate } from '../utils/date';

class ExpenceForm extends Form {
    state = {
        data: {
            amount: 0,
            date: "0000-00-00",
            paymentMethod: "",
            category: "",
            comment: "",
        },
        paymentMethods: [],
        categories: [],
        errors: {},
    }

    schema = {
        amount: Joi.number().positive().required().label('Amount'),
        date: Joi.date().required().label('Date'),
        paymentMethod: Joi.string().required().label('PaymentMethod'),
        category: Joi.string().required().label('Category'),
        comment: Joi.string().allow(null, '').max(100).label('Comment')
    }

    componentDidMount() {
        const { categories, paymentMethods } = this.props
        this.setDate();
        this.setState({categories, paymentMethods});
    }

    setDate = () => {
        const currentDate = generateDate()
        const data = { ...this.state.data }
        data.date = currentDate;
        this.setState({ data });
    }
    
    doSubmit = () => {
        this.props.addExpence(this.state.data);
    }

    render() {
        const { amount, date, comment } = this.state.data;
        const { paymentMethods, categories, errors } = this.state;

        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1 className="text-uppercase text-center m-2">Dodaj wydatek</h1>
                    <form onSubmit={this.handleSubmit}>
                        <Input name="amount" value={amount} type="number" label="Kwota" onChange={this.handleChange} errors={errors} />
                        <Input name="date" value={date} type="date" label="Date" onChange={this.handleChange} errors={errors} />
                        <Select name="paymentMethod" label="Sposób płatności" categories={paymentMethods} onChange={this.handleChange} errors={errors} />
                        <Select name="category" label="Kategoria" categories={categories} onChange={this.handleChange} errors={errors} />
                        <Input name="comment" value={comment} type="text" label="Komentarz" onChange={this.handleChange} errors={errors} />
                        {this.renderButtonGroup("Add", "Back", "/balanceViewer")}
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        );
    }
}

export default withRouter(ExpenceForm);