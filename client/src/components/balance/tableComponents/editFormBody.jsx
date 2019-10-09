import React, { Component } from 'react';
import Input from '../../forms/formsComponents/input';
import Select from '../../forms/formsComponents/select';
import { Button, Form, ModalFooter } from 'reactstrap';

class EditFormBody extends Component {
    state = {
        formType: '',
        id: 0,
        date: "0000-00-00",
        amount: 0,
        paymentMethod: "",
        name: "",
        comment: ""
    }

    componentDidMount() {
        const { id, amount, date, category:name, comment, paymentMethod } = this.props.data;
        this.setState({ formType: this.props.type, id, date, amount, name, comment, paymentMethod })
    }


    handleChange = ({ currentTarget: input }) => {
        const fields = { ...this.state };
        fields[input.name] = input.value;
        const { amount, date, name, comment, paymentMethod } = fields
        this.setState({ amount, date, name, comment, paymentMethod })
    }

    submitFormEdit = event => {
        event.preventDefault();
        this.props.onSubmit(event, this.state, this.props.data);
        this.props.toggle()
    }
    render() {
        const { amount, date, name, comment, paymentMethod } = this.state;
        const { categories, paymentMethods } = this.props;
        return (
            <Form onSubmit={event => this.submitFormEdit(event)}>
                <Input name="amount" value={amount} type="number" label="Kwota" onChange={this.handleChange} required={true} />
                <Input name="date" value={date} type="date" label="Data" onChange={this.handleChange} required={true} />
                {paymentMethods.length > 0 && <Select name="paymentMethod" label="Sposób płatności" value={paymentMethod} categories={paymentMethods} onChange={this.handleChange} required={true} />}
                <Select name="name" label="Kategorie" value={name} categories={categories} onChange={this.handleChange} required={true} />
                <Input name="comment" value={comment} type="text" label="Komentarz" onChange={this.handleChange} />
                <ModalFooter>
                    <Button color="success">Edytuj</Button>
                </ModalFooter>
            </Form>
        );
    }
}

export default EditFormBody;