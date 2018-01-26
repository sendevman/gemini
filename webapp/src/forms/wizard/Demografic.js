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

const ethnicCodes = [];
export default class Demografic extends Component {

    constructor(props) {
        super(props);
        this.state = {form: {startDate: moment()}};
        this.handleChange = this.handleChange.bind(this);

    }


    handleChange(date) {
        // this.setState({
        //     startDate: date
        // });
        let inmigrantYears = moment().diff(date, 'years');
        alert(moment().diff(date, 'years'))
        this.setState({form: {...this.state.form, inmigrantYears: inmigrantYears}})
    }


    render() {
        let form = this.state.form;
        return (<form>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="fatherLabel">Pais de Nacimiento:</label>
                        <select
                            value={form.country}
                            onChange={(event) => {
                                this.setState({
                                    form: {
                                        ...form,
                                        country: event.target.value
                                    }
                                });
                            }} className="form-control" id="gender">
                            <option value="-1">Seleccione su Pais de nacimiento</option>
                            {countries.map((country, i) => (
                                <option key={i} value={country.name}>{country.desc}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group" style={{paddingTop: 10}}>
                        <br/>
                        <label className="radio-inline"><input type="radio" name="bornPR" disabled={true}/>Nacio en PR</label>
                        <label className="radio-inline"><input type="radio" name="bornPR" disabled={true}/>Otro Pais</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="ethnicCode">Codigo de Origin</label>
                        <select id="ethnicCode" className="form-control">
                            <option value="-1">Seleccione Codigo de Origin</option>
                            {ethnicCodes.map((code, i) => (
                                    <option value={code.name}>{code.desc}</option>
                                )
                            )}
                        </select>

                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="inmigrantDate">Fecha de Inmigracion</label>
                        <DatePicker className="form-control" selected={form.startDate} onChange={this.handleChange}/>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="inmigrantYears">A&ntilde;os de Inmigrante</label>
                        <input type="text"
                               className="form-control"
                               id="inmigrantYears"
                               placeholder=""
                               disabled={true}
                               value={form.inmigrantYears}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="residentialStatus">Estatus Residencial</label>
                        <input type="text" className="form-control" id="residentialStatus" placeholder="Estatus Residencial (Preguntar que es??)"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="liveWith">Vive con:</label>
                        <select id="liveWith" className="form-control">
                            <option value="-1">Seleccione vive con</option>
                            <option value="mother">Mam&aacute;</option>
                            <option value="father">Pap&acute;</option>
                            <option value="both">Ambos Padres</option>
                            <option value="legalTutor">Tutor Legal</option>
                        </select>

                    </div>
                </div>
            </div>
        </form>);
    }
}
