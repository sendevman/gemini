/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import {Button} from "react-bootstrap";
import TextInput from "../../components/TextInput";
import DateInput from "../../components/DateInput";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {registerUser, validateForm} from "../../redux/actions";
import CodeSelect from "../../components/CodeSelect";

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                firstName: "",
                middleName: "",
                fatherLastName: "",
                motherLastName: "",
                dateOfBirth: null,
                relationType: "",
                email: "",
                confirmEmail: ""
            },
            valid: false
        };
        this.register = this.register.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.onValidDate = this.onValidDate.bind(this);
        this.onInvalidDate = this.onInvalidDate.bind(this);
        this.validForm = this.validForm.bind(this);
    }

    register(e) {
        let user = this.state.form;
        e.preventDefault();
        this.props.registerUser(user, () => {
            this.props.history.push("/activate/result/success")
        }, () => {
            this.props.history.push("/activate/result/error")
        });
    }


    validForm() {
        let allValid = true;
        let fields = this.refs;
        let emailAreEquals = fields.email.value === fields.confirmEmail.value;
        for (let idx in fields) {
            allValid &= fields[idx].valid();
        }

        this.setState({...this.state, valid: allValid && emailAreEquals})
    }

    inputHandler(e) {
        let form = this.state.form;
        let element = e.target;
        form[element.id] = element.value;
        this.setState({...this.state, form: form}, () => {
            this.validForm();
        });
    }

    onValidDate(date) {
        let form = this.state.form;
        form.dateOfBirth = date;
        this.setState({...this.state, form: form}, () => {
            this.validForm();
        });
    }

    onInvalidDate() {
        this.validForm();
    }

    render() {
        let form = this.state.form;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12" style={{textAlign: "center"}}>
                        <h3>Registro de cuenta</h3>
                    </div>
                </div>
                <div className="row" style={{marginTop: 50}}>
                    <div className="col-md-12">
                        <form onSubmit={this.register}>
                            <div className="row">
                                <div className="col-md-3">
                                    <TextInput id="firstName" type="name"
                                               placeholder="Nombre"
                                               ref="firstName"
                                               onChange={this.inputHandler}
                                               value={form.firstName}/>
                                </div>
                                <div className="col-md-3">
                                    <TextInput id="middleName" type="name"
                                               required={false}
                                               placeholder="Segundo Nombre"
                                               onChange={this.inputHandler}
                                               value={form.middleName}/>
                                </div>
                                <div className="col-md-3">
                                    <TextInput id="fatherLastName" type="lastname"
                                               ref="fatherLastName"
                                               placeholder="Apellido Paterno"
                                               onChange={this.inputHandler}
                                               value={form.fatherLastName}/>
                                </div>
                                <div className="col-md-3">
                                    <TextInput id="motherLastName" type="lastname"
                                               ref="motherLastName"
                                               placeholder="Apellido Materno"
                                               onChange={this.inputHandler}
                                               value={form.motherLastName}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <TextInput id="email"
                                               type="email"
                                               ref="email"
                                               placeholder="Email"
                                               onChange={this.inputHandler}
                                               value={form.email}/>
                                </div>
                                <div className="col-md-3">
                                    <TextInput id="confirmEmail"
                                               type="email"
                                               ref="confirmEmail"
                                               placeholder="Confirmar Email"
                                               onChange={this.inputHandler}
                                               value={form.confirmEmail}/>
                                </div>
                                <div className="col-md-3">
                                    <DateInput showFormat={false}
                                               label="Fecha de Nacimiento"
                                               ref="dob"
                                               onValidDate={this.onValidDate}
                                               onInvalidDate={this.onInvalidDate}
                                               value={form.dateOfBirth}/>
                                </div>
                                <div className="col-md-3">
                                    <CodeSelect id="relationType"
                                                label="Seleccione relacion"
                                                ref="registrationRelations"
                                                codeType="registrationRelations"
                                                value={form.relationType}
                                                onChange={this.inputHandler}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9"/>
                                <div className="col-md-3">
                                    <Button type="submit" block bsStyle="primary"
                                            disabled={!this.state.valid}>Registrar</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(store) {
    return {};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({validateForm, registerUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Registration);
