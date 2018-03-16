import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {forgotPassword} from "../../../redux/actions";

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
                                                   placeholder="Email"
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
    return {form: store.loginHelp};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({forgotPassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(ForgotPassword);
