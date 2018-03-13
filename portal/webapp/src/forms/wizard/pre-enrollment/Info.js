import React, {Component} from "react";

export default class Info extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="center-block col-md-10" style={{float: "none"}}>
                        <h3>{this.props.info}</h3>
                    </div>
                </div>
            </div>);
    }
}