/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Alert, Button, Label} from "react-bootstrap";
import "./Authentication.css";
import logo from "./logo.svg";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {cleanLogin, login} from "../redux/actions";
import TextInput from "../components/TextInput";

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

    componentWillReceiveProps(nextProps) {
        console.log(JSON.stringify(nextProps));
        if (nextProps)
            this.setState({showAlert: nextProps.errorAtLogin || nextProps.invalidCredentials}, () => {
                if (nextProps.errorAtLogin || nextProps.invalidCredentials)
                    setTimeout(() => {
                        this.props.cleanLogin()
                    }, 10000);
            });
    }


    handleDismiss() {
        this.props.cleanLogin()
    }

    handleInputChange(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
        console.log(`id[${element.id}] = ${element.value} - ${form[element.id]}`)

    }


    render() {
        let username = this.props.form.username;
        let password = this.props.form.password;
        let invalidCredentials = this.props.invalidCredentials;
        let showAlert = this.state.showAlert
            ? (<Alert bsStyle="danger" onDismiss={this.handleDismiss} className="auth-alert">
                <h4>Error!</h4>
                <p>
                    {invalidCredentials ? "Crendenciales invalidos" : "Ha occurido un error"}
                </p>
            </Alert>)
            : (null);
        return (
            <form className="login-block" onSubmit={this.login}>
                {showAlert}
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="title"><Label bsStyle="primary">Registro en Linea</Label></h1>
                <TextInput id="username" includeLabel={false} placeholder="Usuario" required={false}
                           onChange={this.handleInputChange} value={username}/>
                <TextInput id="password" includeLabel={false} type="password" placeholder="Contraseña" required={false}
                           onChange={this.handleInputChange} value={password}/>

                <div style={{marginTop: -10, marginBottom: 10}}>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/">Olvido credenciales?</Link>
                        </div>
                        <div className="col-md-6">
                            <div className="pull-right">
                                <Link to="/registration">No posee cuenta?</Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <Button className="login-button" bsStyle="primary" type="submit">Entrar</Button>
                    </div>
                </div>

            </form>);
    }

    login(e) {
        let creds = this.props.form;
        e.preventDefault();

        this.props.login(creds, () => {
                this.props.history.push("/home")
            },
            () => {
                alert("Error autenticando");
            })
    }

}

function mapStateToProps(store) {
    return {
        form: store.login.form,
        invalidCredentials: store.login.invalidCredentials,
        errorAtLogin: store.login.errorAtLogin
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({login, cleanLogin}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Authentication);