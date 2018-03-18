import React, {Component} from "react";
import profileIlustration from "../../style/img/profile-illustration.png";

export default class Instructions extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [

            <div key="inst" className="col-md-7 content-section">
                <div className="title">
                    <div className="description"><h2>Instructions</h2>
                        <div className="violet-line"/>
                    </div>

                    The standard Lorem Ipsum passage, used since the 1500s
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum."
                </div>

                {this.props.footer}

            </div>,
            <div key="picture" className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={profileIlustration} alt=""/></div>
            </div>

        ];
    }
}