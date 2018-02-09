/**
 * Created by fran on 2/7/18.
 */
import React, {Component} from "react";
import InputMask from 'react-input-mask';
import moment from "moment";

export default class DateInput extends Component {

    constructor(props) {
        super(props);
        this.state = {day: '', month: '', year: '', valid: false, pristine: true, value: null};
        this.inputHandler = this.inputHandler.bind(this);
        this.editing = false;
    }

    componentDidMount() {
        this.populateDate(this.props.value)
    }


    populateDate(date) {
        if (date) {
            let form = this.state;
            form.day = date.format("DD");
            form.month = date.format("MM");
            form.year = date.format("YYYY");
            let result = this.checkValid();
            form.valid = result.valid;
            form.value = result.value;
            this.setState({...form});
        }
    }

    checkValid() {
        let form = this.state;
        let valid = moment(`${form.day || '99'}-${form.month || '99'}-${form.year || '9999'}`, "DD-MM-YYYY").isValid() && parseInt(form.year || '0') >= 1900;
        let value = valid ? moment(`${form.day || '99'}-${form.month || '99'}-${form.year || '9999'}`, "DD-MM-YYYY") : null;
        return {valid: valid, value: value}
    }

    inputHandler(e) {
        this.editing = true;
        let form = this.state;
        let element = e.target;
        let id = element.id;
        form[id] = element.value;
        form.pristine = false;

        let result = this.checkValid();
        form.valid = result.valid;
        form.value = result.value;
        this.setState({...this.state});
        console.log(JSON.stringify(form))
        if (this.props.onValidDate && form.valid)
            this.props.onValidDate(form.value.toDate());
        this.editing = false;


    }

    render() {
        let format = "(dd/mm/yyyy)";
        // if (this.state.valid || this.props.value) {
        //     let date = moment(this.state.value || this.props.value);
        //     let day = date.format("DD");
        //     let month = date.format("MMMM");
        //     let year = date.format("YYYY");
        //     format = `(${day}/${month}/${year})`;
        // }
        return <div className="form-group">
            <label htmlFor={this.props.id}>{`${this.props.label} ${format}:`}</label>
            {this.renderDateInput()}
        </div>;
    }

    renderDateInput() {
        let formGroup = "form-group ".concat(!this.state.valid ? "has-error" : "");
        let props = {disabled: this.props.disabled};
        return (
            <div className="row ">
                <div className="col-xs-3">
                    <div className={formGroup}>
                        <InputMask {...props}
                                   mask="99" maskChar=" " placeholder="Dia" className="form-control" id="day"
                                   value={this.state.day}
                                   onChange={this.inputHandler}/>
                    </div>
                </div>
                <div className="col-xs-1" style={{textAlign: "center", paddingLeft: 0, paddingRight: 0}}>
                    <span style={{fontSize: "xx-large"}}>/</span>
                </div>

                <div className="col-xs-3">
                    <div className={formGroup}>
                        <InputMask {...props}
                                   mask="99" maskChar=" " placeholder="Mes" className="form-control" id="month"
                                   value={this.state.month}
                                   onChange={this.inputHandler}/>
                    </div>
                </div>

                <div className="col-xs-1" style={{textAlign: "center", paddingLeft: 0, paddingRight: 0}}>
                    <span style={{fontSize: "xx-large"}}>/</span>
                </div>

                <div className="col-xs-4">
                    <div className={formGroup}>
                        <InputMask {...props}
                                   mask="9999" maskChar=" " className="form-control" id="year" placeholder="Año"
                                   value={this.state.year}
                                   onChange={this.inputHandler}/>
                    </div>
                </div>
            </div>
        );
    }
}

// style={{marginLeft: -15, marginRight: -15}}