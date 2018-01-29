/**
 * Created by fran on 1/26/18.
 */
import React, {Component} from "react";
import {Button} from "react-bootstrap";
import CodeSelect from "../../components/CodeSelect";

export default class Address extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<form>

                <div className="row">
                    <div className="col-md-2">
                        <h5 htmlFor="">Residencial</h5>
                    </div>

                    <div className="col-md-2">
                        <Button bsStyle="primary">Copiar residencial a postal</Button>
                    </div>

                </div>
                {this.renderAddressForm()}
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h5 htmlFor="">Postal</h5>
                        </div>
                    </div>
                </div>
                {this.renderAddressForm()}
            </form>
        );
    }

    renderAddressForm() {
        return (<div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="line1">Linea 1</label>
                        <input type="text" className="form-control" id="line1" placeholder="Linea 1"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="line1">Linea 2</label>
                        <input type="text" className="form-control" id="line2" placeholder="Linea 2"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="city">Ciudad</label>
                        <CodeSelect id="city" placeholder="Seleccione municipio" codeType="municipios"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="state">Estado</label>
                        <CodeSelect id="state" placeholder="Seleccione Estado" codeType="states" value={"PR"} disabled={false}/>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="zip">Codigo Postal</label>
                        <input type="text" className="form-control" id="zip" placeholder="Zip Code"/>
                    </div>
                </div>
            </div>
        </div>);
    }
}
