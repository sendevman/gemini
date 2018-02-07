/**
 * Created by fran on 2/6/18.
 */
import React, {Component} from "react";

export default class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let dummyAddress = `Calle PR Se Levanta\nUrb. Resiliente\nSan Juan, PR 00924`;
        return (<div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3>Perfil del Padre</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label>Nombre:</label>
                    <p className="text">Juan del Pueblo</p>
                </div>
                <div className="col-md-6">
                    <label>Genero:</label>
                    <p className="text">Masculino</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <label>Direccion Residencial:</label>
                    <pre className="text">
                        {dummyAddress}
                    </pre>
                </div>
                <div className="col-md-6">
                    <label>Direccion Postal:</label>
                    <pre className="text">
                        {dummyAddress}
                    </pre>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" placeholder="Email"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="telephone">Telefono</label>
                        <input type="text" className="form-control" id="telephone" placeholder="Telefono"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">Estudiantes</div>
                        <div className="panel-body">
                            <div style={{borderBottomWidth: 1, borderColor: 'gray'}}>
                                <span>Testing Testing</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>);
    }
}
