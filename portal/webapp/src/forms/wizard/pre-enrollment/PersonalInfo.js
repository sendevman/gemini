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

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this);
        this.onValidDate = this.onValidDate.bind(this);
    }

    componentWillMount() {
        this.props.loadPersonalInfo();
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
        return (
            <form>
                <div className="row">
                    <div className="col-md-3">
                        <TextInput id="firstName" type="name" placeholder="Nombre"
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

