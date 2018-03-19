import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {forgotPassword} from "../../../redux/actions";
import registrationIllustration from "../../../style/img/registration-illustration.png";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {valid: false};
        this.inputHandler = this.inputHandler.bind(this);
        this.validForm = this.validForm.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    inputHandler(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
        this.validForm();
    }

    validForm() {
        let valid = this.refs.email.valid();
        this.setState({...this.state, valid: valid})
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

    renderOlde() {
        let form = this.props.form;

        return (<div>
            <div className="container">
                <div className="forgot-password">
                    <div className="row">
                        <div className="col-md-12" style={{textAlign: "center"}}>
                            <h3>Olvido su contraseña</h3>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: 50}}>
                        <div className="col-md-12">
                            <span> Le enviaremos un email con las intrucciones de como reiniciar su contraseña</span>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: 10}}>
                        <div className="col-md-12">
                            <form onSubmit={this.sendEmail}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextInput id="email"
                                                   type="email"
                                                   ref="email"
                                                   label="Email"
                                                   onChange={this.inputHandler}
                                                   value={form.email}/>
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: 20}}>
                                    <div className="col-md-12">
                                        <Button type="submit" block bsStyle="primary"
                                                disabled={!this.state.valid}>Enviar Email</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

function mapStateToProps(store) {
    return {form: Object.assign({}, store.loginHelp)};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({forgotPassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(ForgotPassword);