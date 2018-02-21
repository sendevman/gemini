/**
 * Created by fran on 1/25/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../components/CodeSelect";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {savePreEnrollment, loadPersonalInfo} from "../../redux/actions";

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {form: {}};
        this.handleDobChange = this.handleDobChange.bind(this);
    }

    componentWillMount(){
        this.props.loadPersonalInfo();
    }

    handleDobChange(date) {
        this.setState({form: {...this.state.form, dob: date}});
    }

    onPress(onResult, onError) {
        let form = this.props.student;
        this.props.savePreEnrollment(form, onResult, onError);
    }

    render() {
        let studentLookupResult = this.props.student;
        let student = studentLookupResult || {};
        let studentExists = !(studentLookupResult === null || studentLookupResult === undefined);
        return (
            <form>
                <div className="row">
                    <div className="col-md-3">
                        <TextInput id="nameLabel" type="name" placeholder="Nombre" value={student.firstName}
                                   disabled={studentExists}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="middleLabel" type="name" placeholder="Segundo Nombre"
                                   required={false}
                                   value={student.middleName}
                                   disabled={studentExists}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="fatherLabel" type="lastname" placeholder="Apellido Paternal"
                                   value={student.fatherLastName}
                                   disabled={studentExists}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="motherLabel" type="lastname" placeholder="Apellido Maternal"
                                   value={student.motherLastName}
                                   disabled={studentExists}/>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6">
                        <CodeSelect id="gender"
                                    label="Genero"
                                    codeType="gender"
                                    value={student.gender}
                                    placeholder="Seleccione su Genero"
                                    disabled={studentExists}
                        />

                    </div>
                    <div className="col-md-6">
                        <DateInput label="Fecha de Nacimiento" value={student.dateOfBirth} disabled={studentExists}/>
                    </div>
                </div>
            </form>
        );
    }
}


function mapStateToProps(store) {
    return {student: store.studentInfo.student};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({loadPersonalInfo, savePreEnrollment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PersonalInfo);

