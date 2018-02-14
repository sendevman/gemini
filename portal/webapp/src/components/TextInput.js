import React, {Component} from "react";

let onlyLetter = /^[^0-9]*$/;
let onlyNumber = /^[0-9]*$/;
let onlyLetterAndNumber = /^.*$/;
let emailAcceptedChar = /^\S*$/;
let emailValidation = /[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})/;
let passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&'])[^ ]{8,}$/;
let field = {
    string: {min: 1, max: 128, regex: onlyLetter},
    number: {min: 1, max: 6, regex: onlyNumber},
    name: {min: 1, max: 128, regex: onlyLetter},
    lastname: {min: 1, max: 128, regex: onlyLetter},
    email: {regex: emailAcceptedChar, validation: emailValidation},
    lastSSN: {length: 4, regex: onlyNumber},
    studentNumber: {min: 4, max: 9, regex: onlyNumber},
    zipcode: {length: 5, regex: onlyNumber},
    addressLine: {min: 1, max: 100, regex: onlyLetterAndNumber},
    password: {min: 4, max: 20, regex: emailAcceptedChar, validation: onlyLetterAndNumber}
};

//TODO: fran check when lost focus weird behaviour
export default class TextInput extends Component {

    static defaultProps = {
        required: true,
    };

    constructor(props) {
        super(props);
        this.editing = false;
        this.state = {value: '', hasError: true};
        this.inputHandler = this.inputHandler.bind(this);
        // this.onKeyDown = this.onKeyDown.bind(this)
    }

    valid() {
        return !this.state.hasError;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value && !this.editing) {
            this.setState({hasError: this.hasError(nextProps.value), value: nextProps.value})
        }
    }

    componentWillMount() {
        this.config = field.string;
        if (this.props.type) {
            switch (this.props.type) {
                case 'number':
                    this.config = field.number;
                    break;
                case 'name':
                    this.config = field.name;
                    break;
                case 'lastname':
                    this.config = field.lastname;
                    break;
                case 'email':
                    this.config = field.email;
                    break;
                case 'lastSSN':
                    this.config = field.lastSSN;
                    break;
                case 'studentNumber':
                    this.config = field.studentNumber;
                    break;
                case 'addressLine':
                    this.config = field.addressLine;
                    break;
                case 'zipcode':
                    this.config = field.zipcode;
                    break;
                case 'password':
                    this.config = field.password;
                    break;
            }
        }
    }

    hasError(value) {
        let config = this.config;
        return (config.min && value.length < config.min)
            || (config.length && value.length !== config.length)
            || (config.validation && !config.validation.test(value))
    }

    inputHandler(e) {
        e.persist();
        this.editing = true;

        let value = e.target.value;
        value = this.config.regex.test(value) || value === ""
            ? value.length === 1 ? value.trim() : value
            : this.state.value;

        this.setState({value: value, hasError: this.hasError(value)}, () => {
            this.editing = false;
            if (this.props.onChange)
                this.props.onChange(e);
        });

    }

    render() {
        let isPassword = this.props.type === 'password';
        let hasError = this.state.hasError && this.props.required;
        let groupClass = "form-group ".concat(hasError ? "has-error" : "");
        let props = {...this.props};
        if (this.config.max || this.config.length)
            props = {...props, maxLength: this.config.max || this.config.length};
        return (
            <div className={groupClass}>
                <label htmlFor={this.props.id}>{this.props.label || this.props.placeholder}:</label>
                <input {...props}
                       type={isPassword ? "password" : "text"}
                       className="form-control"
                       onChange={this.inputHandler}
                       value={this.state.value}

                />
            </div>);
    }


}