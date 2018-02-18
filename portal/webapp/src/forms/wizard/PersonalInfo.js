/**
 * Created by fran on 1/25/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../components/CodeSelect";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {form: {genderLabel: 'Genero', gender: "-1", firstname: '', countryLabel: 'Pais', dob: null}};
        this.handleDobChange = this.handleDobChange.bind(this);
    }

    handleDobChange(date) {
        this.setState({form: {...this.state.form, dob: date}});
    }

    render() {
        let student = this.props.student;
        return (
            <form>
                <div className="row">
                    <div className="col-md-3">
                        <TextInput id="nameLabel" type="name" placeholder="Nombre" value={student.firstName}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="middleLabel" type="name" placeholder="Segundo Nombre"
                                   required={false}
                                   value={student.middleName}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="fatherLabel" type="lastname" placeholder="Apellido Paternal"
                                   value={student.lastName}/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="motherLabel" type="lastname" placeholder="Apellido Maternal"
                                   value={student.lastName}/>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6">
                        <CodeSelect id="gender"
                                    label="Genero"
                                    codeType="gender"
                                    value={student.gender}
                                    onChange={(event) => {
                                        this.setState({
                                            form: {
                                                gender: event.target.value
                                            }
                                        });
                                    }}
                                    placeholder="Seleccione su Genero"
                        />

                    </div>
                    <div className="col-md-6">
                        <DateInput label="Fecha de Nacimiento"/>
                    </div>
                </div>

                {/*<div className="row">*/}
                {/*<div className="col-md-6">*/}
                {/*<CodeSelect id="disableReason" label="Impedimento" placeholder="Ninguno" codeType="disabilityCodes"/>*/}
                {/*</div>*/}
                {/*<div className="col-md-6"/>*/}
                {/*</div>*/}
            </form>
        );
    }
}


function mapStateToProps(store) {
    return {student: store.studentLookup.student};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PersonalInfo);

