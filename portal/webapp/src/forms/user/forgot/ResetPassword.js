import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {existsKey, resetPassword} from "../../../redux/actions";
import {Button} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import env from "../../../env";
import profileIllustration from "../../../style/img/profile-illustration.png";

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            token: null
        };
        this.inputHandler = this.inputHandler.bind(this);
        this.reset = this.reset.bind(this);
        this.validForm = this.validForm.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentWillMount() {
        let key = this.props.match.params.credentialLostKey;
        this.props.existsKey(key, () => {
            this.props.history.push("/reset/password/result/invalid")
        })
    }

    verifyCallback(response) {
        let form = this.props.form;
        form.token = response;
        this.setState({...this.state, token: response}, () => {
            this.validForm();
        });
    }

    inputHandler(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
        this.validForm();
    }

    validForm() {
        let allValid = true;
        let fields = this.refs;
        let emailAreEquals = fields.password.value === fields.confirmPassword.value;
        for (let idx in fields) {
            allValid &= fields[idx].valid();
        }

        this.setState({...this.state, valid: allValid && emailAreEquals && this.state.token})
    }


    reset(e) {
        e.preventDefault();
        let form = this.props.form;
        let credentialLostKey = this.props.match.params.credentialLostKey;
        let request = {
            credentialLostKey: credentialLostKey,
            password: form.password,
            confirmPassword: form.confirmPassword
        };
        this.props.resetPassword(request, () => {
            this.props.history.push("/reset/password/result/success")
        }, () => {
            this.props.history.push("/reset/password/result/error")
        });
    }

    render() {
        let form = this.props.form;
        if (!form.validKey)
            return (null);
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description"><h2>Reinicie su contraseña</h2>
                        <div className="violet-line"></div>
                    </div>
                </div>
                <div className="body d-flex align-items-center flex-column justify-content-end">
                    <form onSubmit={this.reset}>
                        <div className="row plr15 ">
                            <div className="col-md-12">
                                <TextInput id="password"
                                           type="password"
                                           ref="password"
                                           label="Contraseña"
                                           onChange={this.inputHandler}
                                           value={form.password}
                                           iconName="icon-lock"
                                           grouped/>
                            </div>
                        </div>
                        <div className="row plr15">
                            <div className="col-md-12">
                                <TextInput id="confirmPassword"
                                           type="password"
                                           label="Confirmar Contraseña"
                                           ref="confirmPassword"
                                           onChange={this.inputHandler}
                                           value={form.confirmPassword}
                                           iconName="icon-lock"
                                           grouped/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ReCAPTCHA
                                    sitekey={env.reCAPTCHASiteKey}
                                    onChange={this.verifyCallback}
                                />
                            </div>
                        </div>

                        <div className="row mt50">
                            <div className="col-md-12 ">
                                <button className="button-green mr30 mob-mb30px" type="submit"
                                        disabled={!this.state.valid}><span>s</span>Reiniciar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={profileIllustration} alt=""/></div>
            </div>
        ]
    }

    renderOld() {
        let form = this.props.form;
        if (!form.validKey)
            return (null);
        return (<div className="container">
            <div className="forgot-password">
                <div className="row">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Reinicie su contraseña</h3>
                        </div>
                    </div>
                    <form onSubmit={this.reset} style={{marginTop: 50}}>
                        <div className="row">
                            <div className="col-md-12">
                                <TextInput id="password" type="password" label="Contraseña" placeholder="Contraseña"
                                           ref="password"
                                           onChange={this.inputHandler}
                                           value={form.password}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <TextInput id="confirmPassword" type="password" label="Confirmar Contraseña"
                                           placeholder="Confirmar Contraseña"
                                           ref="confirmPassword"
                                           onChange={this.inputHandler}
                                           value={form.confirmPassword}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ReCAPTCHA
                                    sitekey={env.reCAPTCHASiteKey}
                                    onChange={this.verifyCallback}
                                />
                            </div>
                        </div>
                        <div className="row" style={{marginTop: 20}}>
                            <div className="col-md-12">
                                <Button type="submit" block bsStyle="primary"
                                        disabled={!this.state.valid}>Reiniciar</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
    }
}

function mapStateToProps(store) {
    return {
        form: store.loginHelp
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({existsKey, resetPassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(ResetPassword);
