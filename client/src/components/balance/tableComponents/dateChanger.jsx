import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';
import Joi from 'joi-browser';
import Input from '../../forms/formsComponents/input';
import { getDate } from '../../utils/date';

class dateChanger extends Component {
    state = { 
        startDate: "",
        endDate: "",
        dateRange: "",
        modal: false,
        errors: {}
    }

    componentDidMount(){ 
        if(localStorage.dateRange === ""){
            localStorage.dateRange = "bieżący miesiąc";   
            const dateRange = localStorage.dateRange;
            this.setState({dateRange});
        }
    } 

    componentDidUpdate(prevProps, prevState){
        if(prevState.dateRange !== this.state.dateRange){
            localStorage.dateRange = this.state.dateRange;
        }
    }

    schema = {
        startDate: Joi.date().required().label('Start Date'),
        endDate: Joi.date().required().min(Joi.ref('startDate')).label('End Date'),
    }

    validate = () => {
        const options = { abortEarly: false };
        const{ startDate, endDate } = this.state;
        const { error } = Joi.validate({ startDate, endDate }, this.schema, options);

        if (!error) return null;
        const errors = {};
        error.details.map(detail => (errors[detail.path] = detail.message));

        return errors;
    }

    setDate = async ({currentTarget}) => {
        const dateRange = currentTarget.innerHTML;
        const dateToSet = getDate(dateRange);   
        const {startDate, endDate} = dateToSet;
        this.setState({ startDate, endDate, dateRange });
        this.props.getData(startDate, endDate);
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        this.setState({[name]: value})
    }

    submitDateForm = (event, startDate, endDate) => {
        event.preventDefault();
        const dateRange = 'zakres z kalendarza'
        const errors = this.validate();
        this.setState({ dateRange, errors: errors || {} });
        if (errors) return;

        this.props.getData(startDate, endDate);
        this.toggle();
    } 

    render() { 
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
        const { startDate, endDate, errors } = this.state;
        const title = "Wybierz zakres dat"
        return ( 
            <React.Fragment>
                <div className="text-uppercase col-12 dropdown text-right m-2">
                    <button className="text-uppercase btn btn-info dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Przeglądasz bilans za {localStorage.dateRange}
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1" style={{ textDecoration: 'none' }}>
                        <li className="dropdown-item" name="bieżący miesiąc" onClick={this.setDate}>bieżący miesiąc </li>
                        <li className="dropdown-item" name="poprzedni miesiąc" onClick={this.setDate}>poprzedni miesiąc </li>
                        <li className="dropdown-item" name="ostatnie 3 miesiące" onClick={this.setDate}>ostatnie 3 miesiące </li>
                        <li className="dropdown-item" name="wybór z kalendarza" onClick={this.toggle}>zakres z kalendarza </li>
                    </ul>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={(event) => this.submitDateForm(event, startDate, endDate)}>
                        <Input name="startDate" value={startDate} type="date" label="Data początkowa" onChange={this.handleChange} required={true} errors={errors}/>
                        <Input name="endDate" value={endDate} type="date" label="Data końcowa" onChange={this.handleChange} required={true} errors={errors}/>
                        <ModalFooter>
                            <Button color="success">ZATWIERDŹ</Button>
                        </ModalFooter>
                    </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}
 
export default dateChanger;