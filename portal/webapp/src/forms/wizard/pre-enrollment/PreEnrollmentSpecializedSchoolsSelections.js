import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {
    getSpecializedSchools,
    loadSpecializedCodes,
    partialAlternatePreEnrollmentSave,
    retrieveAlternatePreEnrollment
} from "../../../redux/actions";
import {connect} from "react-redux";
import AnimationHelper from "../../../components/AnimationHelper";
import SchoolSelector from "../widgets/SchoolSelector";
import RemoteCodeSelect from "../../../components/RemoteCodeSelect";

class PreEnrollmentSpecializedSchoolsSelections extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedCategory: null};
        this.categoryChanged = this.gradeLevelChanged.bind(this);
        this.regionChanged = this.regionChanged.bind(this);
        this.gradeLevelChanged = this.gradeLevelChanged.bind(this);
        this.schoolChanged = this.schoolChanged.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentWillMount() {
        this.props.loadSpecializedCodes(() => {
            this.props.retrieveAlternatePreEnrollment(() => {
            }, () => {
                alert("Error loading")
            });
        });
    }

    onAdd() {
        let form = this.props.alternateEnrollment;
        let size = form.alternateSchools.length || 0;
        let school = this.state.selectedSchool;
        if (size < 2) {
            let object = {
                priority: size + 1,
                school: school,
                schoolName: school.schoolName,
                schoolAddress: school.address
            };
            form.alternateSchools.push(object);
            this.cleanSchoolCode()
        } else {
            alert("Maximo de dos escuela");
        }
    }

    onPress(onResult, onError) {
        let form = this.props.alternateEnrollment;
        let preEnrollment = this.props.preEnrollment;
        form.nextGradeLevel = preEnrollment.nextGradeLevel;
        form.nextGradeLevelDescription = preEnrollment.nextGradeLevelDescription;
        this.props.partialAlternatePreEnrollmentSave(form, onResult, onError);
    }

    cleanSchoolCode() {
        let form = this.props.preEnrollment;
        form.schoolId = -1;
        this.setState({selectedSchool: null});
    }

    categoryChanged(e){
        this.cleanSchoolCode();
        let element = e.target;
        this.setState({selectedCategory: element.value})
    }

    regionChanged(e) {
        this.cleanSchoolCode();
        let form = this.props.preEnrollment;
        let element = e.target;
        form.regionId = element.value;
        if (form.nextGradeLevel !== "-1") {
            this.props.getSpecializedSchools(form.regionId, form.nextGradeLevel, this.state.selectedCategory);
        }
    }

    gradeLevelChanged(gradeLevelObject) {
        this.cleanSchoolCode();
        let form = this.props.preEnrollment;
        form.nextGradeLevel = gradeLevelObject.name;
        if (form.regionId !== "-1") {
            form.nextGradeLevelDescription = gradeLevelObject.displayName;
            this.props.getSpecializedSchools(form.regionId, form.nextGradeLevel);
        }
    }

    schoolChanged(schoolObject) {
        let form = this.props.preEnrollment;
        form.schoolId = schoolObject.schoolId;
        if (form.schoolId !== "-1") {
            form.schoolName = schoolObject.schoolName;
            form.schoolAddress = schoolObject.address;
        }
        this.setState({selectedSchool: schoolObject});
    }

    render() {
        let schoolsSelected = this.props.alternateEnrollment.alternateSchools.length;
        let specializedCategories = this.props.specializedCategories;
        let regions = this.props.regions;
        let gradeLevels = this.props.gradeLevels;
        let schools = this.props.schools;
        let form = this.props.preEnrollment;
        let schoolSelected = this.state.schoolSelected;
        let selectorDisabled = this.refs.selector && this.refs.selector.limit();

        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb30"><h2>Registro de <span>Pre-Matricula</span></h2></div>
                    <span className="f20slg"><span className="f20slb">Vamos a crear el registro.</span> Selecciona dos escuelas como alternativas para la matr&iacute;cula del año escolar 2018-2019:</span>
                </div>
                <div className="body d-flex flex-column justify-content-end" style={{marginTop: -150}}>
                    <div className="row">
                        <div className="col-md-12">
                            <RemoteCodeSelect id="specializedCategory"
                                              placeholder="Categorías"
                                              onObjectChange={this.categoryChanged}
                                              codes={specializedCategories}
                                              target="name"
                                              display="description"
                                              disabled={selectorDisabled}
                                            />
                        </div>
                    </div>
                    <SchoolSelector ref="selector"
                                    form={form}
                                    schoolSelected={schoolSelected}
                                    schoolsSelected={schoolsSelected}
                                    maxSchools={2}
                                    gradeLevels={gradeLevels}
                                    regions={regions}
                                    schools={schools}
                                    regionChanged={this.regionChanged}
                                    gradeLevelChanged={this.gradeLevelChanged}
                                    schoolChanged={this.schoolChanged}
                                    onAdd={this.onAdd}
                                    specializedSchool
                    />
                </div>
                <div style={{marginTop: -120}}>
                    {this.props.footer}
                </div>
            </div>, <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={entrollmentIllustration} alt=""/></div>*/}
                <AnimationHelper type="blackboard"/>
            </div>
        ];
    }

}

function mapStateToProps(store) {
    return {
        student: store.studentInfo.student,
        regions: store.config.regions,
        gradeLevels: store.config.gradeLevels,
        schools: store.config.schools,
        specializedCategories: store.config.specializedCategories,
        preEnrollment: store.preEnrollment.info,
        alternateEnrollment: store.preEnrollment.alternateSchoolEnrollment
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({
        loadSpecializedCodes,
        getSpecializedSchools,
        retrieveAlternatePreEnrollment,
        partialAlternatePreEnrollmentSave
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PreEnrollmentSpecializedSchoolsSelections);
