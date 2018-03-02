import React, {Component} from "react";
import TextInput from "../../../components/TextInput";
import CodeSelect from "../../../components/CodeSelect";
import DateInput from "../../../components/DateInput";

export default class ParentInfoRequest extends Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                <div className="col-md-12">
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
                                    label="Seleccione relacion"
                                    ref="registrationRelations"
                                    codeType="registrationRelations"
                                    value={form.relationType}
                                    onChange={this.inputHandler}/>
                    </div>
                </div>
            </div>

        </form>);
    }
}