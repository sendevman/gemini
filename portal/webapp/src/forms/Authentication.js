/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Alert} from "react-bootstrap";
import Immutable from "immutable";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {clean, cleanLogin, login, toggleCleanTimeout} from "../redux/actions";
import TextInput from "../components/TextInput";
import registrationIllustration from "../style/img/registration-illustration.png";

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false
        };

        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);

    }

    componentWillMount() {
        this.props.clean();
    }

    componentWillReceiveProps(nextProps) {
        console.log(`nextProps = ${JSON.stringify(nextProps)}`);
        if (nextProps)
            this.setState({showAlert: nextProps.errorAtLogin || nextProps.invalidCredentials}, () => {
                if (nextProps.errorAtLogin || nextProps.invalidCredentials) {
                    this.props.cleanLogin();
                }

            });
    }

    handleDismiss() {
        this.props.cleanLogin()
    }

    handleInputChange(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
    }

    render() {
        let form = this.props.form;
        let username = form.username;
        let password = form.password;
        let invalidCredentials = this.props.invalidCredentials;

        let showAlert = this.state.showAlert
            ? (<Alert bsStyle="danger" onDismiss={this.handleDismiss} className="auth-alert">
                <h4>Error!</h4>
                <p>
                    {invalidCredentials ? "Crendenciales invalidos" : "Ha occurido un error"}
                </p>
            </Alert>)
            : (null);
        return [<div className="col-md-5 content-section">
            <div className="title">
                <div className="description"><h2>Entrar</h2>
                    <div className="violet-line"></div>
                </div>
            </div>
            <div className="body d-flex align-items-center flex-column justify-content-end">
                <form id="signin-form" className="signin-form" onSubmit={this.login}>
                    {showAlert}
                    {/*<div className="group form-group has-feedback">*/}
                    {/*/!*<input className="inputMaterial" type="email" name="email" required>*!/*/}

                    {/*<i className="n icon-human"></i>*/}
                    {/*<span className="highlight"></span>*/}
                    {/*<span className="bar"></span>*/}
                    {/*<label>Email Address</label>*/}
                    {/*</div>*/}
                    <TextInput id="username"
                               label="Email"
                               onChange={this.handleInputChange}
                               value={username}
                               iconName="icon-human"
                               grouped/>

                    {/*<div className="group form-group has-feedback">*/}
                    {/*<i className="n icon-lock"></i>*/}
                    {/*<i className="icon-eye"></i>*/}
                    {/*<span className="highlight"></span>*/}
                    {/*<span className="bar"></span>*/}
                    {/*<label>Password</label>*/}
                    {/*</div>*/}

                    <TextInput id="password"
                               type="password"
                               label="Contraseña"
                               onChange={this.handleInputChange}
                               value={password}
                               iconName="icon-lock"
                               grouped/>
                    <button className="button-yellow mt50" id="buttonGet" type="submit">Entrar</button>
                </form>
                <div className="row w-100 mt50">
                    <div className="col-md-6 p-0 text-lg-left text-center">
                        <Link to="/forgot/password/help">Olvido credenciales?</Link>
                    </div>
                    <div className="col-md-6 p-0 text-lg-right text-center">
                        <Link to="/registration">No posee cuenta?</Link>
                    </div>
                </div>
            </div>
        </div>,
            <div className="col-md-6 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={registrationIllustration} alt=""/>
                </div>
            </div>];
    }

    login(e) {
        let creds = Immutable.fromJS(this.props.form).toJS();
        e.preventDefault();

        this.props.login(creds, (nextPath) => {
                this.props.history.push(nextPath)
            },
            () => {
                alert("Error autenticando");
            })
    }

}

function mapStateToProps(store) {
    return {
        form: store.profile.authentication,
        invalidCredentials: store.profile.invalidCredentials,
        errorAtLogin: store.profile.errorAtLogin,
        clean: store.profile.clean
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({clean, login, cleanLogin, toggleCleanTimeout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Authentication);