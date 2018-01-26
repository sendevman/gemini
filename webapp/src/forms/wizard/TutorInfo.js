/**
 * Created by fran on 1/26/18.
 */
import React, {Component} from "react";
import {Button, Modal, Tab, Tabs} from "react-bootstrap";

export default class TutorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {show: false, tutors: [], form: {personal: {}, work: {}, contact: {}}};

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1
        };

    }

    handleSelect(key) {
        // alert(`selected ${key}`);
        this.setState({key});
    }


    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        return (<div className="row">
            <div className="col-md-3">
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Launch demo modal
                </Button>
                {this.renderTutorList()}
            </div>
            <div className="col-md-9">
                {this.renderForm()}
            </div>
            <div className="static-modal">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>One fine body...</Modal.Body>

                    <Modal.Footer>
                        <Button>Close</Button>
                        <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>);
    }

    renderTutorList() {
        return (null);
    }

    renderForm() {
        return (
            <div>
                <div className="row">
                    <Tabs
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                        id="controlled-tab-example">
                        <Tab eventKey={1} title="Personal" style={{marginTop: 20}}>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre:</label>
                                        <input type="text" className="form-control" id="" placeholder="name"/>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="middleName">Segundo Nombre:</label>
                                        <input type="text" className="form-control" id="middleName"
                                               placeholder="Segundo Nombre"/>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="fatherLastname">Apellido Paterno</label>
                                        <input type="text" className="form-control" id="fatherLastname"
                                               placeholder="Apellido Paterno"/>
                                    </div>
                                </div>

                                <div className="col-md-3">

                                    <div className="form-group">
                                        <label htmlFor="motherLastname">Apellido Materno</label>
                                        <input type="text" className="form-control" id="motherLastname"
                                               placeholder="Apellido Materno"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="gender">Genero:</label>
                                        <select id="gender" className="form-control">
                                            <option value="-1">Seleccione</option>
                                            <option value="male">Masculino</option>
                                            <option value="female">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="civilStatus">Estatus Civil</label>
                                        <select id="civilStatus" className="form-control">
                                            <option value="-1">Seleccione</option>
                                            <option value="married">Casado</option>
                                            <option value="lonely">Soltero</option>
                                            <option value="wiodow">Viudo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">

                                    <div className="form-group">
                                        <label htmlFor="relationType">Relaci&oacute;n</label>
                                        <select id="relationType" className="form-control">
                                            <option value="-1">Seleccione</option>
                                            <option value="father">Papa</option>
                                            <option value="mother">Madre</option>
                                            <option value="uncle">Tio</option>
                                            <option value="aunt">Tia</option>
                                            <option value="other">Otro</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Trabajo" style={{marginTop: 20}}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="jobType">Tipo Trabajo:</label>
                                        <select id="jobType" className="form-control">
                                            <option value="-1">Seleccione</option>
                                            <option value="-1">Recepcionista</option>
                                            <option value="-1">Programador</option>
                                            <option value="-1">Gerente</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="workplace">Lugar de Trabajo:</label>
                                        <input type="text" className="form-control" id="workplace"
                                               placeholder="Lugar de Trabajo"/>
                                    </div>
                                </div>

                            </div>
                            <div className="row">


                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="educationLevel">Nivel de Educacion</label>
                                        <select id="educationLevel" className="form-control">
                                            <option value="-1">Seleccione</option>
                                            <option value="elemental">Elemental</option>
                                            <option value="elemental">Intermedia</option>
                                            <option value="highSchool">Escuela Superior</option>
                                            <option value="associate">Grado Asociado</option>
                                            <option value="bacherlor">Barchillerato</option>
                                            <option value="doctor">Doctorado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="annualIncome">Ingreso Anual:</label>
                                        <input type="text" className="form-control" id="annualIncome"
                                               placeholder="Ingreso Anual"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="workPhone">Telefono del trabajo</label>
                                        <input type="text" className="form-control" id="workPhone"
                                               placeholder="Telefono del trabajo"/>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={3} title="Contacto" style={{marginTop: 20}}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="mobilePhone">Telefono Movil</label>
                                        <input type="text" className="form-control" id="mobilePhone"
                                               placeholder="Telefono Movil"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="residentialPhone">Telefono Residencial</label>
                                        <input type="text" className="form-control" id="residentialPhone"
                                               placeholder="Telefono Residencial"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" className="form-control" id="email" placeholder="Email"/>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="emergencyContact">Contacto de Emergencia</label>
                                        <input type="text" className="form-control" id="emergencyContact"
                                               placeholder="Contacto de Emergencia"/>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className=" pull-right">
                            <Button style={{marginRight: 5}} bsStyle="primary">Cancelar</Button>
                            <Button bsStyle="primary">Guardar</Button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}