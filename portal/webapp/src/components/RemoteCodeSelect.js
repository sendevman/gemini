/**
 * Created by fran on 1/29/18.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

class RemoteCodeSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {value: -1, selectedIndex: 0};
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value)
            this.setState({value: nextProps.value})
    }

    onChange(e) {
        e.persist();
        let codes = this.props.codes;
        let element = e.target;
        let value = element.value;
        this.setState({value: value, selectedIndex: element.selectedIndex}, () => {
            if (this.props.onObjectChange) {
                let object = {};
                object[this.props.target] = -1;
                this.props.onObjectChange(element.selectedIndex === 0 ? object : codes[element.selectedIndex - 1]);
            }
            else if (this.props.onChange)
                this.props.onChange(e)

        });

    }

    valid() {
        let selectedIndex = this.state.selectedIndex;
        return selectedIndex > 0;
    }

    render() {
        let formGroupCss = "form-group ".concat(!this.valid() ? "has-error" : "");
        let elementProps = Object.assign({}, this.props);
        let codes = this.props.codes;
        let displayKey = this.props.display;
        let targetKey = this.props.target;

        delete elementProps.codeType;
        return (
            <div className={formGroupCss}>
                <label htmlFor={this.props.id}>{this.props.label || this.props.placeholder}:</label>
                <select className="form-control" {...elementProps} onChange={this.onChange} value={this.state.value}>
                    <option value="-1">{this.props.placeholder}</option>
                    {codes && codes.map((code, i) => (
                        <option key={i} value={code[targetKey]}>{code[displayKey]}</option>
                    ))}
                </select>
            </div>);
    }
}

RemoteCodeSelect.propTypes = {
    codeType: PropTypes.string,
    onObjectChange: PropTypes.func
};


export default RemoteCodeSelect;


