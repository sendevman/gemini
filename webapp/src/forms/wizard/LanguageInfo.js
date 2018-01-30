/**
 * Created by fran on 1/30/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../components/CodeSelect";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";

export default class LanguageInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<form>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="schoolLanguage">Lenguaje de la Escuela</label>
                        <CodeSelect id="schoolLanguage" codeType="languageCodes"
                                    placeholder="Seleccione lenguaje de la escuela"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="schoolLanguageOther">Otro Lenguaje de la Escuela</label>
                        <CodeSelect id="schoolLanguageOther" codeType="languageCodes"
                                    placeholder="Seleccione otro lenguaje de la escuela"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="homeLanguage">Lenguaje de la Casa</label>
                        <CodeSelect id="homeLanguage" codeType="languageCodes"
                                    placeholder="Seleccione lenguaje de la casa"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="homeLanguageOther">Otro Lenguaje de la Casa</label>
                        <CodeSelect id="homeLanguageOther" codeType="languageCodes"
                                    placeholder="Seleccione otro lenguaje de la casa"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="responsibleLanguage">Lenguaje del padre o encargado</label>
                        <CodeSelect id="responsibleLanguage" codeType="languageCodes"
                                    placeholder="Seleccione otro lenguaje del padre o encargado"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="responsibleLanguageOther">Otro Lenguaje del padre o encargado</label>
                        <CodeSelect id="responsibleLanguageOther" codeType="languageCodes"
                                    placeholder="Seleccione otro lenguaje del padre o encargado"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="spanishLanguageSkills">Habilidades del Idioma Español:</label>
                        <br/>
                        <ToggleButtonGroup id="spanishLanguageSkills" type="checkbox">
                            <ToggleButton value={1}>Puedo Hablar</ToggleButton>
                            <ToggleButton value={2}>Puedo Leer</ToggleButton>
                            <ToggleButton value={3}>Puedo Escribir</ToggleButton>
                            <ToggleButton value={4}>Puedo Comprender</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="englishLanguageSkills">Habilidades del Idioma Ingles:</label>
                        <br/>
                        <ToggleButtonGroup id="englishLanguageSkills" type="checkbox">
                            <ToggleButton value={1}>Puedo Hablar</ToggleButton>
                            <ToggleButton value={2}>Puedo Leer</ToggleButton>
                            <ToggleButton value={3}>Puedo Escribir</ToggleButton>
                            <ToggleButton value={4}>Puedo Comprender</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="speakSpanishIssues">Problemas con idioma Espa&ntilde;ol</label>
                        <input type="text" className="form-control" id="speakSpanishIssues"
                               placeholder="Problemas con idioma Espa&ntilde;ol"/>
                    </div>
                </div>
            </div>
        </form>);
    }
}
