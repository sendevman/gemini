/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import DatePicker from "react-datepicker/es/index";
import {Button} from "react-bootstrap";

export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }

    register() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"/>
                    <div className="col-md-6">
                        <h3>Registro de cuenta en MEL</h3>
                    </div>
                    <div className="col-md-3"/>
                </div>
                <div className="row" style={{marginTop: 50}}>
                    <div className="col-md-12">
                        <form>
                            <div className="row">
                                <div className="col-md-3"/>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="lastSSN">Ultimo 4 Digitos seguro social</label>
                                        <input type="text" className="form-control" id="lastSSN"
                                               placeholder="Ultimo 4 Seguro Social"/>
                                    </div>
                                </div>
                                <div className="col-md-3"/>
                            </div>
                            <div className="row">
                                <div className="col-md-3"/>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="dob">Fecha de nacimiento</label>
                                        <DatePicker id="dob" className="form-control" placeholderText="Fecha de nacimiento"/>
                                    </div>
                                </div>
                                <div className="col-md-3"/>
                            </div>
                            <div className="row">
                                <div className="col-md-3"/>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Lastname</label>
                                        <input type="text" className="form-control" id="lastname"
                                               placeholder="Apellido"/>
                                    </div>
                                </div>
                                <div className="col-md-3"/>
                            </div>
                            <div className="row">
                                <div className="col-md-3"/>
                                <div className="col-md-6">
                                    <Button block bsStyle="primary" onClick={this.register}>Registrar</Button>
                                </div>
                                <div className="col-md-3"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};
