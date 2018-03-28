import React, {Component} from "react";
import profileIlustration from "../../style/img/profile-illustration.png";
import AnimationHelper from "../../components/AnimationHelper";

export default class Instructions extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [

            <div key="inst" className="col-md-7 content-section">
                <div className="title">
                    <div className="description"><h2>Instrucciones</h2>
                        <div className="violet-line"/>
                    </div>
                    <p className="f22slg text-justify mt-3">
                        Bienvenidos al proceso de confirmación de matrícula del Departamento de Educación de Puerto
                        Rico.
                        Durante este proceso, tendrás la oportunidad de confirmar la matrícula de tu hijo/a o de
                        solicitarle
                        matrícula, para el próximo año escolar 2018-2019. Este proceso solo te tomará unos minutos.
                        Presiona
                        el botón de <span className="f20slb">‘continuar’</span> para comenzar el proceso.
                    </p>
                </div>

                {this.props.footer}

            </div>,
            <div key="picture" className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={profileIlustration} alt=""/></div>*/}
                <AnimationHelper type="girlsTable"/>
            </div>

        ];
    }
}