/**
 * Created by fran on 1/26/18.
 */
import React, {Component} from "react";
import {Button} from "react-bootstrap";
import CodeSelect from "../../../components/CodeSelect";
import TextInput from "../../../components/TextInput";
import {copyPhysicalToPostal, loadAddress, saveAddress} from "../../../redux/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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
        return (<form>

                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-2">
                                <h5 htmlFor="">Residencial</h5>
                            </div>

                            <div className="col-md-3" style={{marginLeft: 10}}>
                                <Button onClick={this.copyAddress}
                                        bsSize="small"
                                        bsStyle="primary">Copiar residencial a postal</Button>
                            </div>

                        </div>
                        {this.renderAddressForm("physical", props.physical)}

                    </div>

                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <h5 htmlFor="">Postal</h5>
                                </div>
                            </div>
                        </div>
                        {this.renderAddressForm("postal", props.postal)}

                    </div>
                </div>

            </form>
        );
    }

    renderAddressForm(type, address) {
        address.city = !address.city ? "-1" : address.city;
        return (<div>
            <div className="row">
                <div className="col-md-12">
                    <TextInput type="addressLine" id={`${type}.line1`} label="Linea 1" placeholder="Linea 1"
                               value={address.line1} onChange={this.inputHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <TextInput type="addressLine" id={`${type}.line2`} label="Linea 2" placeholder="Linea 2"
                               required={false}
                               value={address.line2} onChange={this.inputHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <CodeSelect id={`${type}.city`} label="Ciudad" placeholder="Seleccione municipio"
                                codeType="municipios"
                                value={address.city} onChange={this.inputHandler}/>
                </div>
                <div className="col-md-4">
                    <CodeSelect id={`${type}.state`} label="Estado" placeholder="Seleccione Estado" codeType="states"
                                value={"PR"}
                                disabled={true} onChange={this.inputHandler}/>
                </div>

                <div className="col-md-4">
                    <TextInput type="zipcode" id={`${type}.zipcode`} label="Codigo Postal" placeholder="Zip Code"
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
