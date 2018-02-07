/**
 * Created by fran on 2/2/18.
 */
import React, {Component} from "react";
import {Button, Glyphicon} from "react-bootstrap";
import moment from "moment";

export default class StatusForm extends Component {

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
    }

    edit() {
        this.props.history.push("/home");
    }

    render() {
        return (
            <div className="container">
                <div style={{marginTop: 20}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-primary"  style={{height: 150}}>
                                <div className="panel-heading">
                                    Estudiante Juan Del Pueblo
                                    <div className="pull-right" style={{marginTop: -5}}>
                                        <Button bsSize="small" bsStyle="info" onClick={this.edit}>
                                            <Glyphicon glyph="glyphicon glyphicon-pencil"/>
                                        </Button>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            Estatus de Pre-Matricula:
                                        </div>
                                        <div className="col-md-3">
                                            <p className="text-danger">Pendiente de procesar</p>
                                        </div>
                                        <div className="col-md-6"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            Fecha de Solicitud:
                                        </div>
                                        <div className="col-md-3">
                                            {moment().format('LL')}
                                        </div>
                                        <div className="col-md-6"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
