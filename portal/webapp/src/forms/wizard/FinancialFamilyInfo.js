/**
 * Created by fran on 1/30/18.
 */
import React, {Component} from "react";

export default class FinancialFamilyInfo extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(<form>
            <div className="row">
                <div className="col-md-4">

                    <div className="form-group">
                        <label htmlFor="">Tipo de ingreso</label>
                        <select id="" className="form-control">
                            <option value="">Seleccione tipo de ingreso</option>
                            <option value="PEN">Pension</option>
                            <option value="SUE">Sueldo</option>
                            <option value="AYU">Ayuda de Gobierno</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="annualIncomeOthers">Otros Totales de ingresos </label>
                        <input type="text" className="form-control" id="annualIncomeOthers" placeholder="Otros Totales de ingresos"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="financialAidAmount">Total de Ayuda Recibida</label>
                        <input type="text" className="form-control" id="financialAidAmount" placeholder="Total de Ayuda Recibida"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="familyTotalMembers">Total de Integrantes en la Familia</label>
                        <input type="text" className="form-control" id="familyTotalMembers" placeholder="Total de Integrantes en la Familia" disabled/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="familyTotalIncome">Ingreso Total Anual</label>
                        <input type="text" className="form-control" id="familyTotalIncome" placeholder="Ingreso Total Anual" disabled/>
                    </div>
                </div>
            </div>
        </form>);
    }
}
