/**
 * Created by fran on 1/25/18.
 */
import React, {Component} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import CodeSelect from "../../components/CodeSelect";
const PRCode = '1790';
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
        this.setState({form: {...this.state.form, inmigrantYears: inmigrantYears}})
    }


    render() {
        let form = this.state.form;
        return (<form>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="country">Pais de Nacimiento:</label>
                        <CodeSelect id="country"
                                    value={form.country}
                                    onChange={(event) => {
                                        this.setState({
                                            form: {
                                                ...form,
                                                country: event.target.value
                                            }
                                        });
                                    }}
                                    placeholder="Seleccione su Pais de nacimiento"
                                    codeType="countries"/>

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group" style={{paddingTop: 10}}>
                        <br/>
                        <label className="radio-inline"><input type="radio" name="bornPR"
                                                               checked={form.country && form.country === PRCode}
                                                               disabled={true}/>Nacio en
                            PR</label>
                        <label className="radio-inline"><input type="radio" name="bornPR"
                                                               checked={form.country && form.country !== PRCode}
                                                               disabled={true}/>Otro
                            Pais</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="ethnicCode"> Codigo Etnico</label>
                        <CodeSelect id="ethnicCode"
                                    placeholder="Seleccione su Codigo Etnico"
                                    codeType="ethnicCodes"/>

                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="inmigrantDate">Fecha de Inmigracion</label>
                        <DatePicker className="form-control" placeholderText="Fecha de Inmigracion"
                                    selected={form.startDate} onChange={this.handleChange}/>
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
                        <CodeSelect id="residentialStatus"
                                    placeholder="Seleccione su Estatus Residencial"
                                    codeType="residentialStatus"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="liveWith">Vive con:</label>
                        <CodeSelect id="liveWith"
                                    placeholder="Seleccione vive con"
                                    codeType="relationTypes"/>

                    </div>
                </div>
            </div>
        </form>);
    }
}
