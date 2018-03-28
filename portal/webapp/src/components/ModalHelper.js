import React, {Component} from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Button from "./Button";

export default class ModalHelper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            title: null,
            message: null
        };
        this.toggle = this.toggle.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open(title, messages, afterCloseAction) {
        this.action = afterCloseAction;
        this.setState({modal: true, title: title, message: messages});
    }

    close() {
        if (this.action) {
            this.action();
        }
        this.setState({modal: false, title: null, message: null});
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (<div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.close}>{this.state.title}</ModalHeader>
                <ModalBody style={{whiteSpace: "pre"}}>
                    {this.state.message}
                </ModalBody>
                <ModalFooter>
                    {/*<Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}*/}
                    <Button color="secondary" onClick={this.close}>OK</Button>
                </ModalFooter>
            </Modal>
        </div>);
    }
}