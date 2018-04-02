/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    getSchools,
    loadCodes,
    partialAlternatePreEnrollmentSave,
    retrieveAlternatePreEnrollment
} from "../../../redux/actions";
import AnimationHelper from "../../../components/AnimationHelper";
import SchoolSelector from "../widgets/SchoolSelector";
import * as Utils from "../../../Utils";
import * as types from "../../../redux/types";
import * as UIHelper from "../../../UIHelper";

class PreEnrollmentAlternateSchoolsSelection extends Component {

    constructor(props) {
        super(props);
        this.fetchSchools = this.fetchSchools.bind(this);
    }

    componentWillMount() {
        this.props.loadCodes(() => {
            this.props.retrieveAlternatePreEnrollment(() => {
            }, () => {
                alert("Error loading")
            });
        });
    }

    onPress(onResult, onError) {
        let form = this.props.alternateEnrollment;
        let preEnrollment = this.props.preEnrollment;
        form.nextGradeLevel = preEnrollment.nextGradeLevel;
        form.nextGradeLevelDescription = preEnrollment.nextGradeLevelDescription;
        form.type = types.REGULAR_ALTERNATE_SCHOOLS;
        this.props.partialAlternatePreEnrollmentSave(form, onResult, onError);
    }

    fetchSchools() {
        let form = this.props.preEnrollment;
        if (!(Utils.isEmptyValue(form.nextGradeLevel) || Utils.isEmptyValue(form.regionId))) {
            this.props.getSchools(form.regionId, form.nextGradeLevel);
        }
    }

    render() {
        let schoolsSelected = this.props.alternateEnrollment.alternateSchools;
        let schoolsSelectedToDelete = this.props.alternateEnrollment.alternateSchoolsToDelete;
        let regions = this.props.regions;
        let gradeLevels = this.props.gradeLevels;
        let schools = this.props.schools;
        let form = this.props.preEnrollment;

        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb30"><h2>Registro de <span>Matrícula</span></h2></div>
                <span className="f20slg"><span className="f20slb">Vamos a crear el registro.</span> Selecciona dos escuelas como alternativas para la matr&iacute;cula del año escolar 2018-2019:</span>
            </div>
            <div className="body d-flex flex-column justify-content-end" style={{marginTop: -150}}>
                <SchoolSelector ref="selector"
                                form={form}
                                schoolsSelected={schoolsSelected}
                                schoolsSelectedToDelete={schoolsSelectedToDelete}
                                maxSchools={2}
                                gradeLevels={gradeLevels}
                                regions={regions}
                                schools={schools}
                                fetchSchools={this.fetchSchools}
                />
            </div>
            <div style={{marginTop: -120}}>
                {this.props.footer}
            </div>
        </div>, <div className="col-md-4 illustration-section d-flex align-items-center text-center">
            {/*<div className="illustration"><img src={entrollmentIllustration} alt=""/></div>*/}
            <AnimationHelper type="blackboard"/>
        </div>];
    }
}

function mapStateToProps(store) {
    return {
        student: store.studentInfo.student,
        regions: store.config.regions,
        gradeLevels: store.config.gradeLevels,
        schools: store.config.schools,
        preEnrollment: store.preEnrollment.info,
        alternateEnrollment: store.preEnrollment.alternateSchoolEnrollment
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({
        loadCodes,
        getSchools,
        retrieveAlternatePreEnrollment,
        partialAlternatePreEnrollmentSave
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PreEnrollmentAlternateSchoolsSelection);
