import React, {Component} from "react";
import {Button} from "react-bootstrap";

export default class ResetPasswordResult extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.history.push("/")
    }

    render() {
        let result = this.props.match.params.result === "success";
        let title;
        if (result === "invalid")
            title = "Lo siento, este enlace para reiniciar su contraseña ya no es valido. Por favor solicite otro";
        else
            title = result ? "Su contraseña ha sido reiniciada" : "Ocurrio un error reiniciando su contraseña";

        return (<div>
            <div className="forgot-password-result">
                <div className="row">
                    <div className="col-md-12">
                        <h5>{title}</h5>
                    </div>
                </div>
                {this.renderSuccess()}
                <div className="row">
                    <div className="col-md-12">
                        <Button block bsStyle="primary" onClick={this.onClick}> Volver</Button>
                    </div>
                </div>
            </div>
        </div>);
    }

    renderSuccess() {
        let success = this.props.match.params.result === "success";
        if (!success)
            return (null);
        return (<div className="row">
            <div className="col-md-12">
                <p>
                    Su contraseña ha sido reiniciada, ahora proceda autenticarse
                </p>
            </div>
        </div>)
    }
}