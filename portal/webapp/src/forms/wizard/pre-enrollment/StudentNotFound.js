import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";
import searchGuy from "../../../style/img/search-guy.png"
import pot from "../../../style/img/pot.png";
import AnimationHelper from "../../../components/AnimationHelper";

export default class StudentNotFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb40"><h2 className="f90sbg">05.</h2>
                        <div className="violet-line"></div>
                    </div>
                    <div className="search-empty visible" style={{position: "static"}}>
                        <img className="search-guy" src={searchGuy} alt=""/>
                        <img className="pot" src={pot} alt=""/>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <p>¡Oh! ¡Oh! La búsqueda no fue exitosa. Si crees que ingresaste algún dato equivocado,
                                    presiona el botón de ‘buscar nuevamente’. Por otro lado, si ingresaste los datos
                                    correctos, presiona el botón de ‘crear registro’.</p>
                            </div>
                            <div className="col-md-12 text-center" style={{minHeight: 120}}/>
                        </div>
                    </div>
                </div>


                {this.props.footer}
            </div>
            ,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration">
                    {/*<img src={leisureIllustration} alt=""/>*/}
                    <AnimationHelper type="rest"/>
                </div>
            </div>
        ];
    }
}