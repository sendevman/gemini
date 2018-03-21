import React, {Component} from "react";
import registrationIllustration from "../style/img/registration-illustration.png";

export default class Welcome extends Component {

    constructor(props) {
        super(props);
        this.goAuthentication = this.goAuthentication.bind(this);
    }

    goAuthentication() {
        this.props.history.push("/login");
    }

    render() {
        return [<div className="col-md-5 content-section">
                <div className="title">
                    <h2>Sistema de Registro</h2>
                    <div className="description"><p>& Estudiantil</p>
                        <div className="green-line"/>
                    </div>

                    <p className="f20slg text-justify">
                        Bienvenidos al proceso de confirmación de matrícula del Departamento de Educación de Puerto
                        Rico.
                        Durante este proceso, tendrás la oportunidad de confirmar la matrícula de tu hijo/a o de
                        solicitarle
                        matrícula, para el próximo año escolar <span className="f20slb">2018-2019</span>.
                    </p>
                </div>
                <div className="body d-flex align-items-center flex-column justify-content-end">
                    <p>Presione el siguiente boton para comenzar</p>
                    <a onClick={this.goAuthentication} className="button-blue">Comenzar</a>
                </div>
            </div>,
            <div className="col-md-6 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={registrationIllustration} alt=""/></div>
            </div>
        ];
    }
}