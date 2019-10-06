import React, { Component } from 'react';
import EditFormBody from './editFormBody';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class EditForm extends Component {
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
        const label = this.props.buttonLabel
        let button = <Button
            color="info"
            onClick={this.toggle}
            style={{ float: "left", marginRight: "10px" }}>{label}
        </Button>
        const title = 'Edycja'
        const { categories, onSubmit, paymentMethods, data, type } = this.props;
        return (
            <div>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        <EditFormBody type={type} toggle={this.toggle} categories={categories} onSubmit={onSubmit} paymentMethods={paymentMethods} data={data} />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default EditForm;