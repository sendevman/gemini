import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";

class ForgotPasswordResult extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.history.push("/")
    }

    render() {
        let success = this.props.match.params.result === "success";
        let title = success ? "Email fue enviado" : "No existe cuenta para ese email";
        return (<div className="container">
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
        let email = this.props.form.email;
        if (!success)
            return (null);
        return (<div className="row">
            <div className="col-md-12">
                <p>
                    Un email con las instrucciones de como reiniciar su contraseña ha sido enviado a {email}.
                    Por favor verifique sus directorios de spam o junk si no ve el email en su buzon de entrada.
                </p>
            </div>
        </div>)
    }
}

function mapStateToProps(store) {
    return {form: store.loginHelp};
}

export default connect(mapStateToProps)(ForgotPasswordResult);
