import React, {Component} from "react";
import RemoteCodeSelect from "../../../components/RemoteCodeSelect";
import {Button, Glyphicon} from "react-bootstrap";
import {getVocationalPrograms, partialSaveVocationalPreEnrollment} from "../../../redux/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Immutable from "immutable";

class VocationalProgramsSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedProgram: null, formPrograms: null};
        this.onProgramChange = this.onProgramChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.programs) {
            
            this.setState({...this.state, formPrograms: Immutable.fromJS(nextProps.programs).toJS()})
        }
    }

    componentWillMount() {
        let form = this.props.currentVocationalEnrollment;
        form.programsToDelete = [];
        this.schoolId = form.schoolId;
        this.props.getVocationalPrograms(this.schoolId)
    }


    onPress(onResult, onError) {
        let form = this.props.currentVocationalEnrollment;
        this.props.partialSaveVocationalPreEnrollment(form, onResult, onError);
    }

    onProgramChange(programObject) {
        this.setState({selectedProgram: programObject})
    }

    onAdd() {
        let form = this.props.currentVocationalEnrollment;
        let program = this.state.selectedProgram;
        program.schoolId = this.schoolId;
        form.programs.push(program);

        let Map = Immutable.fromJS(this.state.formPrograms);
        let index = this.state.formPrograms.indexOf(program);
        let result = Map.delete(index);
        this.setState({...this.state, selectedProgram: null, formPrograms: result.toJS()})
    }

    onDelete = (index) => (e) => {
        let form = this.props.currentVocationalEnrollment;
        let programDeleted = form.programs[index];
        form.programsToDelete.push(programDeleted);
        form.programs.splice(index, 1);

        let list = Immutable.List(this.state.formPrograms);
        list = list.push(programDeleted);
        list = list.sort((a, b) => a.programDescription.localeCompare(b.programDescription));
        this.setState({...this.state, selectedProgram: null, formPrograms: list.toJS()})

    };

    render() {
        let enrollment = this.props.currentVocationalEnrollment;
        let programs = this.state.formPrograms;

        return (<div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <p>Escuela: </p>
                        </div>
                        <div className="col-md-8">
                            <h5>{enrollment && enrollment.schoolName}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <p>Direccion Escuela: </p>
                        </div>
                        <div className="col-md-8">
                            <h5>{enrollment && enrollment.schoolAddress.addressFormatted}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <RemoteCodeSelect id="program"
                                      label="Programa"
                                      placeholder="Seleccione Programa"
                                      codes={programs}
                                      onObjectChange={this.onProgramChange}
                                      target="programCode"
                                      display="programDescription"
                                      value={this.state.selectedProgram}
                    />
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>&nbsp;</label>
                        <Button className="form-control" bsStyle="primary" onClick={this.onAdd}
                                disabled={!programs || programs.length === 0}>A&ntilde;adir</Button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {this.renderProgramsSelections()}
                </div>
            </div>
        </div>);
    }

    renderProgramsSelections() {
        let form = this.props.currentVocationalEnrollment;
        let programs = form.programs;
        return (<table className="table table-striped table-hover ">
            <thead>
            <tr>
                <th>#</th>
                <th>Programa</th>
                <th>Remover</th>
            </tr>
            </thead>
            <tbody>
            {programs && programs.length > 0
                ? programs.map((prog, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{prog.programDescription}</td>
                        <td>
                            <Button bsSize="xsmall" bsStyle="danger" onClick={this.onDelete(index)}>
                                <Glyphicon glyph="glyphicon glyphicon-trash"/>
                            </Button>
                        </td>
                    </tr>
                ))
                : <div><label>No posee ningun programa aun</label></div>}
            </tbody>
        </table>)
    }
}

function mapStateToProps(store) {
    return {
        preEnrollment: store.preEnrollment.info,
        currentVocationalEnrollment: store.preEnrollment.currentVocationalEnrollment,
        programs: store.config.vocationalPrograms
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({getVocationalPrograms, partialSaveVocationalPreEnrollment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(VocationalProgramsSelection);