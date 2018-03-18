import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";
import searchGuy from "../../../style/img/search-guy.png"
import pot from "../../../style/img/pot.png";

export default class StudentNotFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // question: "Estudiante no fue encontrado con la informacion provista, desea realizar nuevamente la busqueda",

        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb40"><h2 className="f90sbg">05.</h2>
                        <div className="violet-line"></div>
                    </div>
                    <div className="search-empty visible">
                        <img className="search-guy" src={searchGuy} alt=""/>
                        <img className="pot" src={pot} alt=""/>
                        <div className="row">
                            <div className="col-md-12 text-center"><p>No hemos podido localizar el estudiante con la
                                informacion provista.</p><span>Do you wish to search again or will you like to create a new student record?</span>
                            </div>
                            <div className="col-md-12 text-center" style={{minHeight: 120}}>

                            </div>
                        </div>
                    </div>
                </div>


                {this.props.footer}
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration">
                    <img src={leisureIllustration} alt=""/>
                </div>
            </div>];
    }
}