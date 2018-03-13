import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import CodeSelect from "../../../components/CodeSelect";
import DateInput from "../../../components/DateInput";
import {saveProfile} from "../../../redux/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class UserInfoRequest extends Component {

    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this);
        this.onValidDate = this.onValidDate.bind(this);
        this.onError = this.onError.bind(this);
    }

    inputHandler(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
    }

    onValidDate(date) {
        let form = this.props.form;
        form.dateOfBirth = date;
    }


    onPress(onResult) {
        let form = this.props.form;
        this.props.saveProfile(form, onResult, this.onError);
    }

    onError(validationMessage) {
        alert(JSON.stringify(validationMessage));
    }

    render() {
        let form = this.props.form;
        return (<form>
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
                <div className="col-md-6">
                    <DateInput showFormat={false}
                               label="Fecha de Nacimiento"
                               ref="dob"
                               onValidDate={this.onValidDate}
                               onInvalidDate={this.onInvalidDate}
                               value={form.dateOfBirth}/>
                </div>
                <div className="col-md-6">
                    <CodeSelect id="relationType"
                                label="Seleccione relacion con el estudiante"
                                ref="registrationRelations"
                                codeType="registrationRelations"
                                value={form.relationType}
                                onChange={this.inputHandler}/>
                </div>
            </div>

        </form>);
    }
}

function mapStateToProps(store) {
    return {
        form: store.profile.form
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({saveProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(UserInfoRequest);