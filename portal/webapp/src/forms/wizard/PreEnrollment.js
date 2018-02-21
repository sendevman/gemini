/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";
import CodeSelect from "../../components/CodeSelect";

export default class PreEnrollment extends Component {

    constructor(props) {
        super(props);
    }

    getEnrollmentStatus(schoolName) {
        if (schoolName)
            return (<p className="text-success">Estudiante Matriculado</p>);
        else
            return (<p className="text-danger">Estudiante No Matriculado</p>);
        {/*<span class="label label-warning">Warning</span>*/
        }

    }

    render() {
        let schoolName = "Esc. Actual";
        return (<form>

            <div className="row">
                <div className="col-md-3">
                    <label>Estatus: </label>
                </div>
                <div className="col-md-3">
                    {this.getEnrollmentStatus(schoolName)}
                </div>
                <div className="col-md-3">
                    <label>Escuela: </label>
                </div>
                <div className="col-md-3">
                    <p>{schoolName}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <CodeSelect id="municipio" label="Municipio" codeType="municipios" placeholder="Municipio"/>
                </div>

                <div className="col-md-4">
                    <CodeSelect id="grades" label="Grado" codeType="grades" placeholder="Municipio"/>
                </div>

                <div className="col-md-4">
                    <CodeSelect id="schools" label="Escuela a matricular" codeType="schools"
                                placeholder="Seleccione escuela"/>
                </div>
            </div>

        </form>);
    }
}
