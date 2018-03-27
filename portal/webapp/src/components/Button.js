import React, {Component} from "react";

export default class Button extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.sizeCss = {padding: 2};

        switch(this.props.size){
            case "small":
                this.sizeCss = {padding: 2};
                break;
            case "normal":
                this.sizeCss = {padding: 5};
                break;
            case "large":
                this.sizeCss = {padding: 10};
                break;
            case "xlarge":
                this.sizeCss = {padding: 20};
                break;
        }
    }

    render(){
        return(
            <button style={this.sizeCss} className="button-yellow" {...this.props}>
                {this.props.children}
        </button>);
    }
}