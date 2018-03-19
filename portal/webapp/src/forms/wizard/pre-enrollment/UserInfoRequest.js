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

    render(){
        return [    <div className="col-md-7 content-section">
            <div className="title">
                <div className="description"><h2>Parent Profile</h2><div className="violet-line"></div></div>
            </div>
            <div className="body d-flex align-items-center flex-column justify-content-end">
                <form id="profile-form" action="profile.html" method="POST">
                    <div className="row plr15">
                        <div className="group form-group has-feedback col-md-6 pl-0 pr50 mb80">
                            <input className="inputMaterial" type="text" name="name" required/>
                                <i className="n icon-human"></i>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Full Name</label>
                        </div>
                        <div className="group form-group has-feedback col-md-6 pl50 pr-0 mb80">
                            <input className="inputMaterial" type="email" name="email" required/>
                                <i className="n icon-mail"></i>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Email Address</label>
                        </div>
                        <div className="group form-group has-feedback col-md-6 pl-0 pr50">
                            <input className="inputMaterial" type="text" name="region" required/>
                                <i className="n icon-gps fs26"></i>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Region</label>
                        </div>
                        <div className="group form-group has-feedback col-md-6 pl50 pr-0 numeric">
                            <input className="inputMaterial" type="text" name="kids" required/>
                                <i className="n icon-teacher fs26"></i>
                                <i className="icon-top"></i>
                                <i className="icon-down"></i>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Kids</label>
                        </div>
                    </div>
                    <div className="row mt50 bt1p pt40">
                        <div className="col-md-12"><button className="button-green mr30 mob-mb30px" type="submit"><span>s</span>Submit</button><a href="#" className="button-white" onclick="window.open('instructions.html', '_self')"><span>s</span>Skip</a></div>
                    </div>
                </form>
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src="img/profile-illustration.png" alt=""/></div>
            </div>];
    }

    renderOld() {
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
                <div className="col-md-6">
                    <TextInput id="lastName" type="lastname"
                               ref="lastName"
                               placeholder="Apellidos"
                               onChange={this.inputHandler}
                               value={form.lastName}/>
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