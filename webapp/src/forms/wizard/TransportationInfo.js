/**
 * Created by fran on 1/30/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../components/CodeSelect";

export default class TransportationInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<form>
            <div className="row">
                <div className="col-md-6">

                    <div className="form-group">
                        <label htmlFor="transportationType">Tipo de transportaci&oacute;n</label>
                        <CodeSelect id="transportationType"
                                    codeType="transportationTypes"
                                    placeholder="Seleccione su tipo de transaportacion"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Transportaci&oacute;n del Estudiante</label>
                        <br/>
                        <label className="radio-inline">
                            <input type="radio" name="studentTransportation" id="transportationNeed" disabled/>Necesita
                            Transportacion
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="studentTransportation" id="haveTransportation" disabled/> Posee
                            Transportacion
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="transportationDistance">Distancia</label>
                        <input type="text" className="form-control" id="transportationDistance"
                               placeholder="Distancia"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Necesitad del Estudiante</label>
                        <br/>
                        <label className="checkbox-inline">
                            <input type="checkbox" id="studentSpecialNeed"/> Requiere transportacion Especial
                        </label>
                    </div>
                </div>
            </div>
        </form>);
    }
}
