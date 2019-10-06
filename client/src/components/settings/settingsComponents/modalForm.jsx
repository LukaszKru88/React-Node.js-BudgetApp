import React, { Component } from 'react';
import CategoriesForm from './categoriesForm';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class ModalForm extends Component {
    state = {
        modal: false,
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
        const { formType, color, title, categories, onSubmit, categoriesType } = this.props;
        return (
            <React.Fragment>
                <Button className="text-uppercase" color={color} onClick={this.toggle}>{formType}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} close={closeBtn} className='text-uppercase'>{title}</ModalHeader>
                    <ModalBody>
                        <CategoriesForm categoriesType={categoriesType} categories={categories} onSubmit={onSubmit} toggle={this.toggle} formType={formType} />
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ModalForm;