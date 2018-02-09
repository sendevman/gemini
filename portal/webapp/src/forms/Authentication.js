/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Button, FormControl, FormGroup, Label} from "react-bootstrap";
import "./Authentication.css";
import logo from "./logo.svg";
import {Link} from "react-router-dom";

export default  class Authentication extends Component {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            username: '',
            password: ''
        };
    }

    getValidationState(evalObj) {
        const length = evalObj.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <form className="login-block">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="title"><Label bsStyle="primary">Registro en Linea</Label></h1>
                <FormGroup
                    controlId="username"
                    validationState={this.getValidationState(this.state.username)}>
                    <FormControl
                        type="text"
                        value={this.state.username}
                        placeholder="usuario"
                        onChange={this.handleUsernameChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="password" validationState={this.getValidationState(this.state.password)}>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        placeholder="contraseña"
                        onChange={this.handlePasswordChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
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
                        <Button className="login-button" bsStyle="primary" onClick={this.login}>Entrar</Button>
                    </div>
                </div>


            </form>);
    }

    login = () => {
        this.props.history.push("/home")
    }

}
