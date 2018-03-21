import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {forgotPassword} from "../../../redux/actions";
import registrationIllustration from "../../../style/img/registration-illustration.png";
import env from "../../../env";
import ReCAPTCHA from "react-google-recaptcha";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {valid: false, token: null};
        this.inputHandler = this.inputHandler.bind(this);
        this.validForm = this.validForm.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    inputHandler(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
        this.validForm();
    }

    validForm() {
        let valid = this.refs.email.valid();
        this.setState({...this.state, valid: valid && this.state.token})
    }

    verifyCallback(response) {
        let form = this.props.form;
        form.token = response;
        this.setState({...this.state, token: response}, () => {
            this.validForm();
        });
    }

    sendEmail(e) {
        e.preventDefault();
        let form = this.props.form;
        this.props.forgotPassword(form, () => {
            this.props.history.push(`/forgot/password/result/success`);
        }, () => {
            this.props.history.push(`/forgot/password/result/error`);
        });
    }

    render() {
        let form = this.props.form;

        return [<div className="col-md-5 content-section">
            <div className="title">
                <div className="description"><h2 className="f60sbg">Olvido su contraseña</h2></div>
                <span className="f30slg"><span
                    className="f20slg">Le enviaremos un email con las intrucciones de como reiniciar su contraseña</span></span>
            </div>
            <div className="body d-flex align-items-center flex-column justify-content-end">
                <form id="recover-form" onSubmit={this.sendEmail}>
                    <TextInput id="email"
                               type="email"
                               ref="email"
                               label="Email"
                               onChange={this.inputHandler}
                               value={form.email}
                               iconName="icon-mail"
                               grouped/>
                    <ReCAPTCHA
                        sitekey={env.reCAPTCHASiteKey}
                        onChange={this.verifyCallback}
                    />
                    <button className="button-yellow mt50" id="buttonGet" type="submit"
                            disabled={!this.state.valid}>Enviar Email
                    </button>
                </form>
                <div className="row w-100 mt50"/>
            </div>
        </div>,
            <div className="col-md-6 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={registrationIllustration} alt=""/></div>
            </div>]
    }

}

function mapStateToProps(store) {
    return {form: store.loginHelp};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({forgotPassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(ForgotPassword);