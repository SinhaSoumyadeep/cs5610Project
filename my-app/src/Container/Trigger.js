
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Login from '../Component/Login'
import Register from "../Component/Register";

class Trigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <a href="#" color="danger" onClick={this.toggle}>{this.props.buttonLabel}</a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody>
                        {this.props.type == 'login' && <Login/>}
                        {this.props.type == 'register' && <Register/>}

                    </ModalBody>

                </Modal>
            </div>
        );
    }
}
export default Trigger

