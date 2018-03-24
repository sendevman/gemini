import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import leisureIllustration from "../../../style/img/leisure-illustration.png";
import AnimationHelper from "../../../AnimationHelper";

class ForgotPasswordResult extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.history.push("/login")
    }

    render() {
        let success = this.props.match.params.result === "success";
        let title = success ? "Correo electr\u00f3nico fue enviado" : "¡Upss!";
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2>{title}!</h2>
                    <div className="violet-line"/>
                </div>
                {this.renderMessage()}
            </div>
            <div className="body d-flex align-items-center flex-column justify-content-end">
                <div className="row action-section">
                    <div className="col-md-12 text-center text-lg-left p-0">
                        <a className="button-green mr30 mob-mb30px" onClick={this.onClick}><span>y</span>Volver</a>
                    </div>
                </div>
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>];
    }

    renderMessage() {
        let success = this.props.match.params.result === "success";
        let email = this.props.form.email;
        if (!success)
            return (<p>No existe una cuenta para el email ingresado.</p>);
        return (
            <p>
                Un email con las instrucciones de como reiniciar su contraseña ha sido enviado a <span className="f20slb">{email}. </span>
                 Por favor verifique sus directorios de spam o junk si no ve el email en su buzon de entrada.
            </p>)
    }
}

function mapStateToProps(store) {
    return {form: store.loginHelp};
}

export default connect(mapStateToProps)(ForgotPasswordResult);
