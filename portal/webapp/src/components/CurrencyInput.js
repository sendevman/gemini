import React, {Component} from "react";
import NumberFormat from "react-number-format";

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
        let groupCss = "form-group ".concat(!this.state.valid ? "has-error" : "");
        return (
            <div className={groupCss}>
                <label htmlFor={this.props.id}>{this.props.label || this.props.placeholder}:</label>
                <NumberFormat {...this.props}
                              onChange={this.onChange}
                              maxLength={maxValueAllowed.length}
                              className="form-control"
                              decimalScale={2}
                              displayType='input'
                              thousandSeparator={true}
                              prefix={'$'}/>
            </div>);
    }
}