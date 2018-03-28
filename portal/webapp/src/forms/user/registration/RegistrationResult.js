import React, {Component} from "react";
import profileIllustration from "../../../style/img/profile-illustration.png";
import {connect} from "react-redux";
import AnimationHelper from "../../../components/AnimationHelper";

class RegistrationResult extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.history.push("/login")
    }

    render() {
        let success = this.props.match.params.result === "success";
        let title = success ? "Cuenta Registrada" : "¡Upss!";
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
                {/*<div className="illustration"><img src={profileIllustration} alt=""/></div>*/}
                <AnimationHelper type="girlsTable"/>
            </div>];
    }

    renderMessage() {
        let email = this.props.form.email;
        let success = this.props.match.params.result === "success";
        if (!success)
            return (<p>Ha occurrido un error al registrar su cuenta</p>);

        return (<p>
            Un email con las instrucciones de como completar su registro de cuenta ha sido enviado a <span
            className="f20slb">{email}. </span>
            Por favor verifique sus directorios de spam o junk si no ve el email en su buzon de entrada.
        </p>)
    }

}

function mapStateToProps(store) {
    return {form: store.registration.form};
}

export default connect(mapStateToProps)(RegistrationResult);


