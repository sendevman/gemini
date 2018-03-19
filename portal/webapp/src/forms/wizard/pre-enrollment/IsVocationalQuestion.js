import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";

export default class IsVocationalQuestion extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb40"><h2 className="f90sbg">01.</h2>
                        <div className="violet-line"/>
                    </div>
                    <p className="f45sbg">¿Vas a solicitar matr&iacute;cula en un programa de <span className="f45sbb">Educación Ocupacional o Técnica</span>?</p>
                </div>

                {this.props.footer}
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={leisureIllustration} alt=""/></div>
            </div>
        ];
    }
}