/**
 * Created by fran on 1/30/18.
 */
import React, {Component} from "react";
import MedicalConditionCheckbox from "../../components/MedicalConditionCheckbox";

export default class MedicalInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<form>
            <div className="row">
                <div className="col-md-12">
                    <MedicalConditionCheckbox name="Posee Condicion Visual" id="visual">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="visualCondition">Condicion</label>
                                    <input type="text" className="form-control" id="visualCondition" placeholder=""/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="visualTreatment">Tratamiento</label>
                                    <input type="text" className="form-control" id="visualTreatment" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </MedicalConditionCheckbox>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <MedicalConditionCheckbox name="Posee Condicion Auditiva" id="hearing">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="hearingCondition">Condicion</label>
                                    <input type="text" className="form-control" id="hearingCondition" placeholder=""/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="visualTreatment">Tratamiento</label>
                                    <input type="text" className="form-control" id="hearingTreatment" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </MedicalConditionCheckbox>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <MedicalConditionCheckbox name="Posee Condicion Dental" id="dental">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="visualCondition">Condicion</label>
                                    <input type="text" className="form-control" id="dentalCondition" placeholder=""/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="visualTreatment">Tratamiento</label>
                                    <input type="text" className="form-control" id="dentalTreatment" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </MedicalConditionCheckbox>
                </div>
            </div>
        </form>);
    }
}
