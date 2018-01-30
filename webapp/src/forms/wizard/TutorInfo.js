/**
 * Created by fran on 1/26/18.
 */
import React, {Component} from "react";
import {Button, Glyphicon, Tab, Tabs} from "react-bootstrap";
import {clear} from "../../Utils";
import CodeSelect from "../../components/CodeSelect";

export default class TutorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 1,
            tutors: [],
            form: {
                personal: {
                    name: "",
                    middleName: "",
                    fatherLastname: "",
                    motherLastname: "",
                    gender: "",
                    maritalStatus: "",
                    relationType: "",
                    relationTypeDesc: ""
                },
                work: {
                    jobType: "",
                    workplace: "",
                    educationLevel: "",
                    annualIncome: "",
                    workPhone: ""
                },
                contact: {
                    mobilePhone: "",
                    residentialPhone: "",
                    email: "",
                    emergencyContact: "",
                    emergencyContactPhone: ""
                }
            }
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.inputHandler = this.inputHandler.bind(this);

    }

    handleEdit = index => e => {
        let editTutor = Object.assign({}, this.state.tutors[index]);
        this.state.tutors.splice(index, 1);
        this.setState({...this.state, form: editTutor})
    };

    handleDelete = index => e => {
        this.state.tutors.splice(index, 1);
        this.setState({...this.state})
    };

    inputHandler(e) {
        let form = this.state.form;
        let element = e.target;
        let tokens = element.id.split(".");
        let context = tokens[0];
        let id = tokens[1];

        form[context][id] = element.value;
        if(element.id === "personal.relationType") {
            let index = element.selectedIndex;
            form.personal.relationTypeDesc = element[index].text;
        }

        this.setState({...this.state, form: form});
    }

    handleSave() {
        let form = this.state.form;
        let tutors = this.state.tutors;
        tutors.push(form);
        this.setState({...this.state, form: this.cleanForm(), tutors: tutors});
    }

    handleCancel() {
        this.setState({...this.state, form: this.cleanForm()});
    }

    handleSelect(key) {
        this.setState({...this.state, key});
    }

    cleanForm() {
        let oldForm = this.state.form;
        let form = Object.assign({}, oldForm);
        form.personal = clear(oldForm.personal);
        form.work = clear(oldForm.work);
        form.contact = clear(oldForm.contact);
        return form;

    }

    render() {
        return (<div className="row">
            <div className="col-md-3">
                {this.renderTutorList()}
            </div>
            <div className="col-md-9">
                {this.renderForm()}
            </div>
        </div>);
    }

    renderTutorList() {
        let tutors = this.state.tutors;
        return (<div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Padres o Tutores</h3>
                </div>
                <div className="panel-body">
                    {tutors && tutors.length > 0
                        ? tutors.map((tutor, index) => (
                            <div key={index} style={{padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1}}>
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-md-12">
                                                {tutor.personal.name + ' ' + tutor.personal.fatherLastname + ' ' + tutor.personal.motherLastname}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <span
                                                    className="label label-primary">{tutor.personal.relationTypeDesc}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row">
                                            <Button bsSize="xsmall" onClick={this.handleEdit(index)}
                                                    style={{marginBottom: 5}}>
                                                <Glyphicon bsStyle="primary" glyph="glyphicon glyphicon-pencil"/>
                                            </Button>
                                        </div>
                                        <div className="row">
                                            <Button bsSize="xsmall" bsStyle="danger" onClick={this.handleDelete(index)}>
                                                <Glyphicon glyph="glyphicon glyphicon-trash"/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        ))
                        : (<div style={{padding: 10}}>
                            <label>No posee ningun padre o tutor</label>
                        </div>)}


                </div>
            </div>
        </div>);
    }

    renderForm() {
        let form = this.state.form;
        return (
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <Tabs
                            activeKey={this.state.key}
                            onSelect={this.handleSelect}
                            id="controlled-tab-example">
                            <Tab eventKey={1} title="Personal" style={{marginTop: 20}}>
                                {this.renderPersonalTab(form.personal)}
                            </Tab>
                            <Tab eventKey={2} title="Trabajo" style={{marginTop: 20}}>
                                {this.renderWorkTab(form.work)}
                            </Tab>
                            <Tab eventKey={3} title="Contacto" style={{marginTop: 20}}>
                                {this.renderContactTab(form.contact)}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className=" pull-right">
                            <Button style={{marginRight: 5}} bsStyle="primary"
                                    onClick={this.handleCancel}>Cancelar</Button>
                            <Button bsStyle="primary" onClick={this.handleSave}>Guardar</Button>
                        </div>
                    </div>
                </div>
            </form>

        );
    }

    renderPersonalTab(personal) {
        return (<div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="personal.name">Nombre:</label>
                        <input type="text" className="form-control" id="personal.name" placeholder="Nombre"
                               value={personal.name} onChange={this.inputHandler}/>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="personal.middleName">Segundo Nombre:</label>
                        <input type="text" className="form-control" id="personal.middleName"
                               placeholder="Segundo Nombre" value={personal.middleName} onChange={this.inputHandler}/>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="personal.fatherLastname">Apellido Paterno</label>
                        <input type="text" className="form-control" id="personal.fatherLastname"
                               placeholder="Apellido Paterno"
                               value={personal.fatherLastname} onChange={this.inputHandler}/>
                    </div>
                </div>

                <div className="col-md-3">

                    <div className="form-group">
                        <label htmlFor="personal.motherLastname">Apellido Materno</label>
                        <input type="text" className="form-control" id="personal.motherLastname"
                               placeholder="Apellido Materno"
                               value={personal.motherLastname} onChange={this.inputHandler}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="personal.gender">Genero:</label>
                        <CodeSelect id="personal.gender"
                                    value={personal.gender}
                                    onChange={this.inputHandler}
                                    placeholder="Seleccione Genero"
                                    codeType="gender"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="personal.maritalStatus">Estatus Civil</label>
                        <CodeSelect id="personal.maritalStatus"
                                    value={personal.maritalStatus}
                                    onChange={this.inputHandler}
                                    placeholder="Seleccione su estatus civil"
                                    codeType="maritalStatuses"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="personal.relationType">Relaci&oacute;n</label>
                        <CodeSelect id="personal.relationType"
                                    value={personal.relationType}
                                    onChange={this.inputHandler}
                                    placeholder="Seleccione su relacion con el estudiante"
                                    codeType="relationTypes"/>
                    </div>
                </div>
                <div className="col-md-6"/>
            </div>
        </div>);
    }

    renderWorkTab(work) {
        return (<div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="work.jobType">Tipo Trabajo:</label>

                        <select id="work.jobType" className="form-control" value={work.jobType}
                                onChange={this.inputHandler}>
                            <option value="">Seleccione</option>
                            <option value="1">Recepcionista</option>
                            <option value="2">Programador</option>
                            <option value="3">Gerente</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="work.workplace">Lugar de Trabajo:</label>
                        <input type="text" className="form-control" id="work.workplace"
                               placeholder="Lugar de Trabajo" value={work.workplace} onChange={this.inputHandler}/>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="work.educationLevel">Nivel de Educacion</label>
                        <CodeSelect id="work.educationLevel"
                                    value={work.educationLevel}
                                    onChange={this.inputHandler}
                                    placeholder="Seleccione su nivel educacional"
                                    codeType="educationLevels"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="work.annualIncome">Ingreso Anual:</label>
                        <input type="text" className="form-control" id="work.annualIncome"
                               placeholder="Ingreso Anual" value={work.annualIncome} onChange={this.inputHandler}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="work.workPhone">Telefono del trabajo</label>
                        <input type="text" className="form-control" id="work.workPhone"
                               placeholder="Telefono del trabajo" value={work.workPhone} onChange={this.inputHandler}/>
                    </div>
                </div>
            </div>
        </div>);
    }

    renderContactTab(contact) {
        return (<div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="mobilePhone">Telefono Movil</label>
                        <input type="text" className="form-control" id="contact.mobilePhone"
                               placeholder="Telefono Movil" value={contact.mobilePhone} onChange={this.inputHandler}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="residentialPhone">Telefono Residencial</label>
                        <input type="text" className="form-control" id="contact.residentialPhone"
                               placeholder="Telefono Residencial" value={contact.residentialPhone}
                               onChange={this.inputHandler}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="contact.email" placeholder="Email"
                               value={contact.email} onChange={this.inputHandler}/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="emergencyContact">Contacto de Emergencia</label>
                        <input type="text" className="form-control" id="contact.emergencyContact"
                               placeholder="Contacto de Emergencia" value={contact.emergencyContact}
                               onChange={this.inputHandler}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="emergencyContactPhone">Telefono del contacto de
                            Emergencia</label>
                        <input type="text" className="form-control" id="contact.emergencyContactPhone"
                               placeholder="Telefono del contacto de Emergencia" value={contact.emergencyContactPhone}
                               onChange={this.inputHandler}/>
                    </div>
                </div>
            </div>
        </div>);
    }
}
