/**
 * Created by fran on 1/25/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../../components/CodeSelect";
import DateInput from "../../../components/DateInput";
import TextInput from "../../../components/TextInput";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadPersonalInfo, savePreEnrollment} from "../../../redux/actions";
import entrollmentIllustration from "../.././../style/img/entrollment-illustration.png";

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this);
        this.onValidDate = this.onValidDate.bind(this);
    }

    componentWillMount() {
        this.props.loadPersonalInfo(() => {
        }, () => {
            alert("Ocurrio un error buscando la solicitud");
        });
    }

    inputHandler(e) {
        let form = this.props.student;
        let element = e.target;
        form[element.id] = element.value;
    }

    onValidDate(date) {
        let form = this.props.student;
        form.dateOfBirth = date;
    }

    onPress(onResult, onError) {
        let form = this.props.student;
        this.props.savePreEnrollment(form, onResult, onError);
    }

    original() {
        return (<div>
            <div class="col-md-7 content-section">
                <div class="title">
                    <div class="description mb40"><h2 class="f90sbg">OK.</h2>
                        <div class="violet-line"></div>
                    </div>
                    <span class="f20slg"><span class="f30slg">Let’s <span class="f30slb">Pre-register</span> the student in the system</span></span>
                </div>
                <div class="body d-flex align-items-center flex-column justify-content-end">
                    <form id="pre-register-form" action="#" method="POST" class="mt50">
                        <div class="row plr15 pb50">
                            <div class="group form-group has-feedback col-md-6 pl-0 pr50">
                                <input class="inputMaterial" type="text" name="name" required/>
                                <i class="n icon-human fs26"></i>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Full Name</label>
                            </div>
                            <div class="group form-group has-feedback col-md-6 pl50 pr-0 numeric">
                                <input class="inputMaterial" type="text" name="age" required/>
                                <i class="n icon-teacher fs26"></i>
                                <i class="icon-top"></i>
                                <i class="icon-down"></i>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Age</label>
                            </div>
                        </div>
                        <div class="row action-section">
                            <div class="col-md-12 text-center text-lg-left p-0">
                                <button type="submit" class="button-green mr30 mob-mb30px"><span>s</span>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-4 illustration-section d-flex align-items-center text-center">
                <div class="illustration"><img src="img/entrollment-illustration.png" alt=""/></div>
            </div>
        </div>)
    }

    render() {
        let student = this.props.student;
        let studentExists = this.props.found;
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2 className="f90sbg">OK.</h2>
                    <div className="violet-line"></div>
                </div>
                <span className="f20slg"><span className="f30slg">Vamos <span className="f30slb">Registrar o Editar</span> el estudiante en el sistema</span></span>
            </div>
            <div className="body">
                <form className="mt50" style={{marginTop: -100}}>
                    <div className="row plr15 pb50">
                        <div className="col-md-3 pl-0 pr50">
                            <TextInput id="firstName" type="name" label="Nombre"
                                       value={student.firstName}
                                       onChange={this.inputHandler}
                                       disabled={studentExists}/>
                        </div>
                        <div className="col-md-3 pl-0 pr50">
                            <TextInput id="middleName" type="name" label="Segundo Nombre"
                                       value={student.middleName}
                                       onChange={this.inputHandler}
                                       disabled={studentExists}/>
                        </div>
                        <div className="col-md-6 pl-0 pr50">
                            <TextInput id="fatherLastName" type="lastname" label="Apellidos"
                                       value={student.fatherLastName}
                                       onChange={this.inputHandler}
                                       disabled={studentExists}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <CodeSelect id="gender"
                                        label="Genero"
                                        codeType="gender"
                                        value={student.gender}
                                        onChange={this.inputHandler}
                                        placeholder="Seleccione su Genero"
                                        disabled={studentExists}
                            />

                        </div>
                        {/*<div className="col-md-6">*/}
                        {/*<DateInput id="dateOfBirth" label="Fecha de Nacimiento"*/}
                        {/*value={student.dateOfBirth}*/}
                        {/*onValidDate={this.onValidDate}*/}
                        {/*disabled={studentExists}/>*/}
                        {/*</div>*/}
                    </div>
                    {this.props.footer}
                </form>
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={entrollmentIllustration} alt=""/></div>
            </div>];
    }

    renderOld() {
        let student = this.props.student;
        let studentExists = this.props.found;
        return (
            <form>
                <div className="row">
                    <div className="col-md-3">
                        <TextInput id="firstName" type="name" labe="Nombre"
                                   value={student.firstName}
                                   onChange={this.inputHandler}
                                   disabled={studentExists}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="middleName" type="name" placeholder="Segundo Nombre"
                                   required={false}
                                   value={student.middleName}
                                   onChange={this.inputHandler}
                                   disabled={studentExists}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="fatherLastName" type="lastname" placeholder="Apellido Paternal"
                                   value={student.fatherLastName}
                                   onChange={this.inputHandler}
                                   disabled={studentExists}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="motherLastName" type="lastname" placeholder="Apellido Maternal"
                                   value={student.motherLastName}
                                   onChange={this.inputHandler}
                                   disabled={studentExists}/>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6">
                        <CodeSelect id="gender"
                                    label="Genero"
                                    codeType="gender"
                                    value={student.gender}
                                    onChange={this.inputHandler}
                                    placeholder="Seleccione su Genero"
                                    disabled={studentExists}
                        />

                    </div>
                    <div className="col-md-6">
                        <DateInput id="dateOfBirth" label="Fecha de Nacimiento"
                                   value={student.dateOfBirth}
                                   onValidDate={this.onValidDate}
                                   disabled={studentExists}/>
                    </div>
                </div>
            </form>
        );
    }
}


function mapStateToProps(store) {
    return {
        student: store.studentInfo.student,
        found: store.studentLookup.found
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({loadPersonalInfo, savePreEnrollment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PersonalInfo);

