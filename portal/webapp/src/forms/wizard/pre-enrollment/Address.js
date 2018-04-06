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
import * as UIHelper from "../../../UIHelper";


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
        e.preventDefault();
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
                <div className="title">
                    <div className="description"><h2>{UIHelper.getText("addressPageTitleStart")}<span
                        className="f40sbb">{UIHelper.getText("addressPageTitleEnd")}</span></h2>
                        <div className="violet-line"></div>
                    </div>
                    <span className="f20slg">{UIHelper.getText("addressPageMessage")}</span>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="f20slb">{UIHelper.getText("addressPageMessageHighlight")}</span>
                        </div>
                    </div>
                </div>
                <div className="body d-flex flex-column justify-content-end">
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-5">
                                        <h5 htmlFor="">{UIHelper.getText("addressPagePhysicalAddressButton")}</h5>
                                    </div>

                                    <div className="col-md-6" style={{marginLeft: 5}}>
                                        <Button size="small"
                                                onClick={this.copyAddress}>{UIHelper.getText("copyButton")}</Button>
                                    </div>

                                </div>
                                {this.renderAddressForm("physical", props.physical)}

                            </div>

                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 htmlFor="">{UIHelper.getText("addressPagePostalAddressButton")}</h5>
                                    </div>
                                </div>
                                {this.renderAddressForm("postal", props.postal)}

                            </div>
                        </div>
                    </form>
                    <div style={{marginTop: -90}}>
                        {this.props.footer}
                    </div>
                </div>

            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>
        ];
    }

    renderAddressForm(type, address) {
        address.city = !address.city ? "-1" : address.city;
        return [
            <div className="row pt-2">
                <div className="col-md-12">
                    <TextInput type="addressLine" id={`${type}.line1`} label="Línea 1"
                               value={address.line1} onChange={this.inputHandler}/>
                </div>
            </div>,
            <div className="row">
                <div className="col-md-12">
                    <TextInput type="addressLine" id={`${type}.line2`} label="Línea 2"
                               value={address.line2} onChange={this.inputHandler}/>
                </div>
            </div>,
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
                    <TextInput type="zipcode" id={`${type}.zipcode`} label="Zip Code"
                               value={address.zipcode} onChange={this.inputHandler}/>
                </div>
            </div>
        ];
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
