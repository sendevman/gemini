/**
 * Created by fran on 1/30/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../components/CodeSelect";

export default class AdditionalInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<form>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="insuranceHealthPlan">Seguro Medico:</label>
                        <input type="text" className="form-control" id="insuranceHealthPlan"
                               placeholder="Seguro Medico"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="commitment">Commitment</label>
                        <input type="text" className="form-control" id="commitment" placeholder="Commitment"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="discussFamilyInfo">Discuss Family Info </label>
                        <input type="text" className="form-control" id="discussFamilyInfo"
                               placeholder="Que significa?"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="internetDisclosure">Internet Disclosure</label>
                        <input type="text" className="form-control" id="internetDisclosure"
                               placeholder="Que Significa?"/>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Marca si aplica:</label>
                        <br/>
                        <div style={{paddingTop: 10}}>
                            <div className="checkbox-inline">
                                <label><input type="checkbox" name="leftHanded"/>&nbsp;&nbsp;Es zurdo</label>
                            </div>

                            <div className="checkbox-inline">
                                <label><input type="checkbox" name="leftHanded"/>&nbsp;&nbsp;Requiere Educacion Especial</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Marca si aplica:</label>
                        <br/>
                        <div style={{paddingTop: 10}}>

                            <div className="checkbox-inline">
                                <label><input type="checkbox" name="leftHanded"/>&nbsp;&nbsp;Posee Computadora en
                                    casa</label>
                            </div>

                            <div className="checkbox-inline">
                                <label><input type="checkbox" name="leftHanded"/>&nbsp;&nbsp;Posee Internet en
                                    casa</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="foodOptions">Opciones de Comida</label>
                        <CodeSelect codeType="foodOptions" id="foodOptions" placeholder="Seleccione su opcion de comida"/>
                    </div>
                </div>
            </div>
        </form>);
    }
}
