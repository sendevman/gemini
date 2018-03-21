/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {searchStudent} from "../../../redux/actions";
import searchIllustration from "../../../style/img/search-illustration.png";
import SimpleDateInput from "../../../components/SimpleDateInput";

class StudentIdentification extends Component {

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
        this.props.searchStudent(form, onResult, this.onError);
    }

    onError(validationMessage) {
        alert(JSON.stringify(validationMessage));
    }


    render() {
        let form = this.props.form;
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb40"><h2 className="f90sbg">OK.</h2>
                        <div className="violet-line"></div>
                    </div>
                    <p className="f30slg">Vamos a buscar su niño/a en el sistema. Por favor facilitenos <span
                        className="f30slb">la siguiente informaci&oacute;n.</span></p>
                </div>
                <div className="body" style={{padding: 20, marginTop: -50}}>
                    <div className="row">
                        <div className="col-md-4">
                            <SimpleDateInput id="dateOfBirth"
                                             value={form.dateOfBirth}
                                             required
                                             onValidDate={this.onValidDate}
                                             label=""/>
                        </div>
                        <div className="col-md-4">

                            <TextInput id="lastSsn"
                                       type="lastSSN"
                                       value={form.lastSsn}
                                       onChange={this.inputHandler}
                                       label="Ultimo #4 ssn"/>
                        </div>

                        <div className="col-md-4">
                            <TextInput id="studentNumber"
                                       type="studentNumber"
                                       value={form.studentNumber}
                                       onChange={this.inputHandler}
                                       label="# Estudiante SIE"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <TextInput id="firstName"
                                       type="firstName"
                                       value={form.firstName}
                                       onChange={this.inputHandler}
                                       label="Nombre"/>
                        </div>
                        <div className="col-md-4">
                            <TextInput id="lastName"
                                       type="lastname"
                                       value={form.lastName}
                                       onChange={this.inputHandler}
                                       label="Apellidos"/>
                        </div>
                        <div className="col-md-4"/>
                    </div>
                    {this.props.footer}
                </div>
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img className="w90" src={searchIllustration} alt=""/></div>
            </div>

        ];
    }
}

function mapStateToProps(store) {
    return {form: store.studentLookup.form};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({searchStudent}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(StudentIdentification);
