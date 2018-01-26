/**
 * Created by fran on 1/25/18.
 */
import React, {Component} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
const countries = [{name: 'pr', desc: 'Puerto Rico'},
    {name: 'us', desc: 'Estados Unidos'},
    {name: 'pe', desc: 'Peru'},
    {name: 'me', desc: 'Mexico'}];

export default class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {form: {genderLabel: 'Genero', gender: "-1", firstname: '', countryLabel: 'Pais', dob: null}};
        this.handleDobChange = this.handleDobChange.bind(this);
    }

    handleDobChange(date){
        this.setState({form: {...this.state.form, dob: date}});
    }

    render() {
        let form = this.state.form;
        return (
            <form>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="nameLabel">Nombre:</label>
                            <input type="text" className="form-control" id="nameLabel" placeholder="Nombre"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="middleLabel">Segundo Nombre:</label>
                            <input type="text" className="form-control" id="middleLabel" placeholder="Segundo Nombre"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="motherLabel">Apellido Maternal:</label>
                            <input type="text" className="form-control" id="motherLabel"
                                   placeholder="Apellido Maternal"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="fatherLabel">Apellido Paternal:</label>
                            <input type="text" className="form-control" id="fatherLabel"
                                   placeholder="Apellido Paternal"/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fatherLabel">Genero:</label>
                            <select
                                value={form.gender}
                                onChange={(event) => {
                                    this.setState({
                                        form: {
                                            ...form,
                                            gender: event.target.value
                                        }
                                    });
                                }} className="form-control" id="gender">
                                <option value="-1">Seleccione su Genero</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="dob">Fecha de Nacimiento:</label>
                            <DatePicker className="form-control" selected={form.dob} onChange={this.handleDobChange}/>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="disableReason">Impedimento</label>
                            <select id="disableReason" className="form-control">
                                <option value="-1">Ninguno</option>
                                <option value="blind">Ciego Legal</option>
                                <option value="cojo">Cojo</option>
                                <option value="manco">manco</option>
                            </select>

                        </div>
                    </div>

                    <div className="col-md-6">
                       <div className="form-group">
                           <label htmlFor="disableReasonOther">Otro Impedimento</label>
                           <input type="text" className="form-control" id="disableReasonOther" placeholder="Escriba Otro impedimento"/>
                       </div>
                    </div>
                </div>
            </form>
        );
    }
}
