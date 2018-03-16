import React, {Component} from "react";
import {Button} from "react-bootstrap";

export default class RegistrationResult extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.history.push("/")
    }

    render() {
        let success = this.props.match.params.result === "success";
        let message = success
            ? "Su cuenta fue registrada exitosamente"
            : "Ha occurrido un error al registrar su cuenta";
        return (<div className="container" style={{padding: "70px 0", border: "3px solid #777"}}>

            <div className="row">
                <div className="center-block" style={{width: success ? 450 : 500}}>
                    <h3 className={success ? "text-success" : "text-danger"}>{message}</h3>
                </div>
            </div>
            <div className="row">
                <div className="center-block" style={{width: 100}}>
                    <Button bsStyle="primary" onClick={this.onClick}>{success ? "Ingresar" : "Volver"}</Button>
                </div>
            </div>
        </div>);
    }
}

