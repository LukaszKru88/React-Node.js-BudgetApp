import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap'

class DeleteForm extends Component {
    state = {
        modal: false,
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    renderButton(color, label, onClick) {
        return (
            <Button color={color} onClick={onClick}>{label}</Button>
        );
    }

    delete = () => {
        this.props.onDelete(this.props.data, this.props.type);
        this.toggle();
    }

    render() {
        return (
            <div>
                {this.renderButton("danger", "Usuń", this.toggle)}
                < Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalBody>
                        <div className="text-center text-uppercase m-3">czy jesteś pewien, że chcesz usunąc ten wpis z tablicy?</div>
                        {this.renderButton("danger", "Usuń", this.delete)}{' '}
                        {this.renderButton("info", "Powrót", this.toggle)}
                    </ModalBody>
                </Modal >
            </div>
        );
    }
}

export default DeleteForm;