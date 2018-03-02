import React, {Component} from "react";
import TextInput from "../../components/TextInput";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {activateAccount, existsCode} from "../../redux/actions";
import {Button} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import env from "../../env";

class Activation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            token: null
        };
        this.inputHandler = this.inputHandler.bind(this);
        this.activate = this.activate.bind(this);
        this.validForm = this.validForm.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentWillMount() {
        let code = this.props.match.params.activationCode;
        this.props.existsCode(code)
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


    activate(e) {
        let form = this.props.form;
        form.activationCode = this.props.match.params.activationCode;
        e.preventDefault();
        this.props.activateAccount(form, () => {
            this.props.history.push("/activate/result/success")
        }, () => {
            this.props.history.push("/activate/result/error")
        });
    }

    render() {
        let form = this.props.form;
        if (!this.props.validCode)
            return (null);
        return (<div className="container">
            <div className="row">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Culminar Registro</h3>
                    </div>
                </div>
                <form onSubmit={this.activate} style={{marginTop: 50}}>
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
                                    disabled={!this.state.valid}>Registrar</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }
}

function mapStateToProps(store) {
    return {validCode: store.registration.validCode, form: store.registration.activationForm};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({activateAccount, existsCode}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Activation);
