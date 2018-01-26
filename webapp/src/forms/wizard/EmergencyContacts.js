/**
 * Created by fran on 1/26/18.
 */
import React, {Component} from "react";
import {Button} from "react-bootstrap";

export default class EmergencyContacts extends Component {

    constructor(props) {
        super(props);
        this.state = {form: {name: "", lastname: "", relationType: "", phoneNumber: ""}, contacts: []};

        this.inputHandler = this.inputHandler.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    clear(form) {
        let cloneObj = Object.assign({}, form);
        for (let prop in cloneObj) {
            if (cloneObj.hasOwnProperty(prop))
                cloneObj[prop] = '';
        }
        return cloneObj;

    }

    save() {
        let form = this.state.form;
        let contacts = this.state.contacts;
        contacts.push(form);
        this.setState({form: this.clear(form), contacts: contacts});
    }

    cancel() {
        let form = this.state.form;
        this.setState({form: this.clear(form), contacts: this.state.contacts,});

    }

    inputHandler(e) {
        let form = this.state.form;
        let element = e.target;
        form[element.id] = element.value;
        this.setState({...this.state, form: form});
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    {this.renderList()}
                </div>

                <div className="col-md-6">
                    {this.renderForm()}
                </div>
            </div>
        );
    }

    renderList() {
        let contacts = this.state.contacts;
        return (<div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Contactos de emergencia</h3>
                </div>
                <div className="panel-body">
                    {contacts && contacts.length > 0
                        ? contacts.map((contact, i) => (
                            <div key={i} style={{padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1}}>
                                <div className="row">
                                    <div className="col-md-6">
                                        {contact.name + ' ' + contact.lastname}
                                    </div>
                                    <div className="col-md-6">
                                        {contact.phoneNumber}
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <span className="label label-primary">{contact.relationType}</span>
                                    </div>
                                </div>
                            </div>

                        ))
                        : (<div style={{padding: 10}}>
                            <label>No posee ningun contatcto de emergencia</label>
                        </div>)}


                </div>
            </div>
        </div>);
    }

    renderForm() {
        let form = this.state.form;
        return (<form id="contact-form">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" className="form-control"
                               id="name"
                               placeholder="Nombre"
                               value={form.name}
                               onChange={this.inputHandler}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Apellido</label>
                        <input type="text" className="form-control" id="lastname"
                               placeholder="Apellido"
                               value={form.lastname}
                               onChange={this.inputHandler}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="relationType">Relacion</label>
                        <select id="relationType" className="form-control"
                                value={form.relationType}
                                onChange={this.inputHandler}
                        >
                            <option value="-1">Seleccione relaci&oacute;n</option>
                            <option value="friend">Amigo/a</option>
                            <option value="uncle">Tio</option>

                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Tel&eacute;fono</label>
                        <input type="text" className="form-control" id="phoneNumber"
                               placeholder="Teléfono"
                               value={form.phoneNumber}
                               onChange={this.inputHandler}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className=" pull-right">
                        <Button onClick={this.cancel} style={{marginRight: 5}} bsStyle="primary">Cancelar</Button>
                        <Button onClick={this.save} bsStyle="primary">Guardar</Button>
                    </div>
                </div>
            </div>
        </form>);
    }
}

