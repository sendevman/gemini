import React, {Component} from "react";
import NumberFormat from "react-number-format";
import * as UIHelper from "../UIHelper";

const maxValueAllowed = "999,999,999,999.00";
export default class CurrencyInput extends Component {

    constructor(props) {
        super(props);
        this.state = {valid: false};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({valid: value.length > 0});
        if (this.props.onChange)
            this.props.onChange(e);
    }

    render() {
        let grouped = this.props.grouped ? "group" : "";
        let groupCss = grouped + " form-group has-feedback";

        let validHtml = UIHelper.toggleFieldValidHtml(this.state.valid, this.props.required);

        return (
            <div className={groupCss}>
                <NumberFormat {...this.props}
                              onChange={this.onChange}
                              maxLength={maxValueAllowed.length}
                              className="inputMaterial"
                              decimalScale={2}
                              displayType='input'
                              thousandSeparator={true}
                              prefix={'$'}/>
                <label htmlFor={this.props.id}>{this.props.label || this.props.placeholder}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{validHtml}</label>
            </div>);
    }
}