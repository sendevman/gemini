/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import {Button} from "react-bootstrap";
import TextInput from "../../components/TextInput";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {registerUser, validateForm} from "../../redux/actions";
import ReCAPTCHA from "react-google-recaptcha";
import env from "../../env";
import "./Registration.css";


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

    register(e) {
        let user = this.props.form;
        e.preventDefault();
        this.props.registerUser(user, () => {
            this.props.history.push("/activate/result/success")
        }, () => {
            this.props.history.push("/activate/result/error")
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12" style={{textAlign: "center"}}>
                        <h3>Registro de cuenta</h3>
                    </div>
                </div>
                <div className="row" style={{marginTop: 50}}>
                    <div className="col-md-12">
                        <form onSubmit={this.register} className="register-form">
                            <div className="row">
                                <div className="col-md-12">
                                    <TextInput id="email"
                                               type="email"
                                               ref="email"
                                               placeholder="Email"
                                               onChange={this.inputHandler}
                                               value={form.email}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <TextInput id="confirmEmail"
                                               type="email"
                                               ref="confirmEmail"
                                               placeholder="Confirmar Email"
                                               onChange={this.inputHandler}
                                               value={form.confirmEmail}/>
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
                                            disabled={!this.state.valid}>Registrar</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(store) {
    return {form: store.registration.form};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({validateForm, registerUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Registration);
