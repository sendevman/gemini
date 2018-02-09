/**
 * Created by fran on 1/25/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../components/CodeSelect";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";

export default class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {form: {genderLabel: 'Genero', gender: "-1", firstname: '', countryLabel: 'Pais', dob: null}};
        this.handleDobChange = this.handleDobChange.bind(this);
    }

    handleDobChange(date) {
        this.setState({form: {...this.state.form, dob: date}});
    }

    render() {
        let form = this.state.form;
        return (
            <form>
                <div className="row">
                    <div className="col-md-3">
                        <TextInput id="nameLabel" type="name" label="Nombre" placeholder="Nombre"/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="middleLabel" type="name" label="Segundo Nombre" placeholder="Segundo Nombre"/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="motherLabel" type="lastname" label="Apellido Maternal"
                                   placeholder="Apellido Maternal"/>
                    </div>
                    <div className="col-md-3">
                        <TextInput id="fatherLabel" type="lastname" label="Apellido Paternal"
                                   placeholder="Apellido Paternal"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <CodeSelect id="gender"
                                    label="Genero"
                                    codeType="gender"
                                    value={form.gender}
                                    onChange={(event) => {
                                        this.setState({
                                            form: {
                                                ...form,
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

                <div className="row">
                    <div className="col-md-6">
                        <CodeSelect id="disableReason" label="Impedimento" placeholder="Ninguno" codeType="disabilityCodes"/>
                    </div>
                    <div className="col-md-6"/>
                </div>
            </form>
        );
    }
}
