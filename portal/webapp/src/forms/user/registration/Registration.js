/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {cleanRegistration, registerUser, validateForm} from "../../../redux/actions";
import ReCAPTCHA from "react-google-recaptcha";
import env from "../../../env";
import AnimationHelper from "../../../components/AnimationHelper";


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            token: null
        };
        this.register = this.register.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.onValidDate = this.onValidDate.bind(this);
        this.onInvalidDate = this.onInvalidDate.bind(this);
        this.validForm = this.validForm.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentWillMount() {
        this.props.cleanRegistration();
    }

    register(e) {
        let user = this.props.form;
        e.preventDefault();
        this.props.registerUser(user, () => {
            this.props.history.push("/registration/result/success")
        }, () => {
            this.props.history.push("/registration/result/error")
        });
    }

    verifyCallback(response) {
        console.log(response);
        let form = this.props.form;
        form.token = response;
        this.setState({...this.state, token: response}, () => {
            this.validForm();
        });

    }

    validForm() {
        let allValid = true;
        let fields = this.refs;
        let emailAreEquals = fields.email.value === fields.confirmEmail.value;
        for (let idx in fields) {
            allValid &= fields[idx].valid();
        }
        this.setState({...this.state, valid: allValid && emailAreEquals && this.state.token})
    }

    inputHandler(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
        this.validForm();
        // this.setState({...this.state, form: form}, () => {
        //     this.validForm();
        // });
    }

    onValidDate(date) {
        let form = this.props.form;
        form.dateOfBirth = date;
        this.setState({...this.state, form: form}, () => {
            this.validForm();
        });
    }

    onInvalidDate() {
        this.validForm();
    }

    render() {
        let form = this.props.form;
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description"><h2>Registrar Cuenta</h2>
                        <div className="violet-line"></div>
                    </div>
                </div>
                <div className="body d-flex align-items-center flex-column justify-content-end">
                    <form onSubmit={this.register}>
                        <div className="row plr15 ">
                            <div className="col-md-12">
                                <TextInput id="email"
                                           type="email"
                                           ref="email"
                                           label="Email"
                                           onChange={this.inputHandler}
                                           value={form.email}
                                           iconName="icon-mail"
                                           grouped/>
                            </div>
                        </div>
                        <div className="row plr15">
                            <div className="col-md-12">
                                <TextInput id="confirmEmail"
                                           type="email"
                                           ref="confirmEmail"
                                           label="Confirmar Email"
                                           onChange={this.inputHandler}
                                           value={form.confirmEmail}
                                           iconName="icon-mail"
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
                                        disabled={!this.state.valid}><span>s</span>Registrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={profileIllustration} alt=""/></div>*/}
                <AnimationHelper type="girlsTable"/>
            </div>
        ]
    }

}

function mapStateToProps(store) {
    return {form: store.registration.form};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({validateForm, registerUser, cleanRegistration}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Registration);
