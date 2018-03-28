/**
 * Created by fran on 1/25/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../../components/CodeSelect";
import TextInput from "../../../components/TextInput";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadPersonalInfo, savePreEnrollment} from "../../../redux/actions";
import SimpleDateInput from "../../../components/SimpleDateInput";
import AnimationHelper from "../../../components/AnimationHelper";
import SocialSecurityInput from "../../../components/SocialSecurityInput";

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

    render() {
        let student = this.props.student;
        let studentExists = this.props.found;
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description"><h2 className="f90sbg">OK.</h2>
                    <div className="violet-line"></div>
                </div>
                <span className="f30slg">Vamos <span
                    className="f30slb">Registrar o Editar</span> el estudiante en el sistema</span>
            </div>
            <div className="body d-flex flex-column">
                <div className="row" style={{marginTop: -170}}>
                    <div className="col-md-12">
                        <SocialSecurityInput id="ssn"
                                             label="Seguro Social"
                                             value={student.ssn}
                                             onChange={this.inputHandler}
                                             required
                                             disabled={studentExists}/>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-md-3 ">
                        <TextInput id="firstName" type="name" label="Nombre"
                                   value={student.firstName}
                                   onChange={this.inputHandler}
                                   required
                                   disabled={studentExists}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="middleName" type="name"
                                   label="Segundo Nombre"
                                   labelStyle={{left: 0, fontSize: 18}}
                                   value={student.middleName}
                                   onChange={this.inputHandler}
                                   disabled={studentExists}/>
                    </div>
                    <div className="col-md-6">
                        <TextInput id="lastName" type="lastname" label="Apellidos"
                                   value={student.lastName}
                                   onChange={this.inputHandler}
                                   required
                                   disabled={studentExists}/>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-md-6 pt-4">
                        <CodeSelect id="gender"
                                    label="Genero"
                                    codeType="gender"
                                    value={student.gender}
                                    required
                                    onChange={this.inputHandler}
                                    placeholder="Genero"
                                    disabled={studentExists}
                        />

                    </div>
                    <div className="col-md-6">
                        <SimpleDateInput id="dateOfBirth"
                                         label="Fecha de Nac."
                                         required
                                         value={student.dateOfBirth}
                                         onValidDate={this.onValidDate}
                                         disabled={studentExists}/>
                    </div>
                </div>
                <div style={{marginTop: -20}}>
                    {this.props.footer}
                </div>
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={entrollmentIllustration} alt=""/></div>*/}
                <AnimationHelper type="blackboard"/>
            </div>];
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

