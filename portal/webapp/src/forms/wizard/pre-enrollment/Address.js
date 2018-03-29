/**
 * Created by fran on 1/26/18.
 */
import React, {Component} from "react";
import CodeSelect from "../../../components/CodeSelect";
import TextInput from "../../../components/TextInput";
import {copyPhysicalToPostal, loadAddress, saveAddress} from "../../../redux/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AnimationHelper from "../../../components/AnimationHelper";
import Button from "../../../components/Button";

class Address extends Component {

    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this);
        this.copyAddress = this.copyAddress.bind(this);
    }

    componentWillMount() {
        this.props.loadAddress();
    }

    inputHandler(e) {
        let form = {...this.props};
        let element = e.target;
        let tokens = element.id.split(".");
        let context = tokens[0];
        let id = tokens[1];
        form[context][id] = element.value;
    }

    copyAddress(e) {
        this.props.copyPhysicalToPostal();
    }

    onPress(onResult, onError) {
        let form = {physical: this.props.physical, postal: this.props.postal};
        //check if there any change
        this.props.saveAddress(form, onResult, onError);
    }


    render() {
        let props = {...this.props};
        return [
            <div className="col-md-7 content-section">
                <div className="body" style={{padding: 40}}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-5">
                                    <h5 htmlFor="">Residencial</h5>
                                </div>

                                <div className="col-md-6" style={{marginLeft: 5}}>
                                    <Button size="small" onClick={this.copyAddress}>Copiar</Button>
                                </div>

                            </div>
                            {this.renderAddressForm("physical", props.physical)}

                        </div>

                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 htmlFor="">Postal</h5>
                                </div>
                            </div>
                            {this.renderAddressForm("postal", props.postal)}

                        </div>
                    </div>
                </div>
                {this.props.footer}
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>
        ];
    }

    renderAddressForm(type, address) {
        address.city = !address.city ? "-1" : address.city;
        return (<div className="mt-4">
            <div className="row">
                <div className="col-md-12">
                    <TextInput type="addressLine" id={`${type}.line1`} label="Linea 1"
                               value={address.line1} onChange={this.inputHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <TextInput type="addressLine" id={`${type}.line2`} label="Linea 2"
                               value={address.line2} onChange={this.inputHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <CodeSelect id={`${type}.city`}
                                label="Ciudad"
                                codeType="municipios"
                                grouped
                                value={address.city} onChange={this.inputHandler}/>
                </div>
                {/*<div className="col-md-4">*/}
                {/*<CodeSelect id={`${type}.state`} label="Estado"  codeType="states"*/}
                {/*value={"PR"}*/}
                {/*disabled={true} onChange={this.inputHandler}/>*/}
                {/*</div>*/}

                <div className="col-md-5">
                    <TextInput type="zipcode" id={`${type}.zipcode`} label="Zip"
                               value={address.zipcode} onChange={this.inputHandler}/>
                </div>
            </div>
        </div>);
    }
}

function mapStateToProps(store) {
    return {
        physical: store.studentInfo.physicalAddress,
        postal: store.studentInfo.postalAddress
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({loadAddress, copyPhysicalToPostal, saveAddress}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(Address);
