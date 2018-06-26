
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Login from '../Component/Login'
import Register from "../Component/Register";
import Settings from "./Settings";

class Trigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            profile: " "
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount()
    {
        if(this.props.profileURL != undefined){
            this.setState({profile: this.props.profileURL})
        }

    }


    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <a href="#" style={{color: this.props.color}} onClick={this.toggle}>{this.props.buttonLabel}</a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody>

                        {this.props.type == 'login' && <Login/>}
                        {this.props.type == 'register' && <Register/>}
                         <h3>{this.state.profile.firstName}</h3>
                        {this.props.type == 'settings' && <Settings profileSetting={this.state.profile}/>}

                    </ModalBody>

                </Modal>
            </div>
        );
    }
}
export default Trigger

