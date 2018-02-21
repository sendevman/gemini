/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

// import {withRouter} from 'react-router-dom'


class SubmitRequest extends Component {

    constructor(props) {
        super(props);
    }

    onPress() {
        this.props.history.push("/status")

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <blockquote>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                        </blockquote>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <blockquote>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                        </blockquote>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <blockquote>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                        </blockquote>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(store) {
    return {};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(SubmitRequest);

