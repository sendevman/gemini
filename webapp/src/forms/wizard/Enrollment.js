/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";

export default class Enrollment extends Component {

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

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="school">Grado:</label>
                        <select id="school" className="form-control">
                            <option value="-1">Grado</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>

                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="school">Escuela a matricular</label>
                        <select id="school" className="form-control">
                            <option value="-1">Seleccione escuela a matricular</option>
                            <option value="123">Esc. A</option>
                            <option value="456">Esc. B</option>
                            <option value="789">Esc. C</option>
                            <option value="0123">Esc. D</option>
                        </select>
                    </div>
                </div>


            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="">Razon para transferir de escuela</label>
                        <input type="text" className="form-control" id="" placeholder="Razon para transferir"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="">Otra razon para transferir de escuela</label>
                        <input type="text" className="form-control" id=""
                               placeholder="Otra razon para transferir de escuela"/>
                    </div>
                </div>
            </div>
        </form>);
    }
}
