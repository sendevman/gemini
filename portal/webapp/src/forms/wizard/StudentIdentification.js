/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";

export default class StudentIdentification extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="row">
            <div className="col-md-4">
                <TextInput id="lastSsn"
                           label="Ultimo 4 digitos seguro social"
                           type="lastSSN"
                           placeholder="Ultimo 4 digitos seguro social"/>
            </div>
            <div className="col-md-4">
                <TextInput id="sieStudentNumber"
                           label="Numero de Estudiante SIE"
                           type="studentNumber"
                           placeholder="Numero de Estudiante SIE"/>
            </div>

            <div className="col-md-4">
                <DateInput id="dob" label="Fecha nacimiento"/>
            </div>
        </div>);
    }
}
