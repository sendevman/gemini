/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";
import DatePicker from "react-datepicker/es/index";

export default class StudentIdentification extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="lastSsn">Ultimo 4 Digito Seguro Social:</label>
                    <input type="text" className="form-control" id="lastSsn" placeholder="Ultimo 4 digitos seguro social"/>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="sieStudentNumber">Numero del SIE:</label>
                    <input type="text" className="form-control" id="sieStudentNumber" placeholder="Numero del SIE"/>
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="dob">Fecha nacimiento:</label>
                    <DatePicker id="dob" className="form-control" placeholderText="Fecha de nacimiento"/>
                </div>
            </div>
        </div>);
    }
}
