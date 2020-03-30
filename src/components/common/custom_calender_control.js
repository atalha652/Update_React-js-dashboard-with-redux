import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CustomCalenderControl extends Component {
    clearDate(name){
        this.props.clearDate(name);
    }
    render() {
        var value = "Select Date";
        if (this.props.value!=="") {
            value = this.props.value;
        }
        if(this.props.clearable){
            return (
                <button
                    className={this.props.borderSuccess?"btn btn-outline-custom-secondary btn-labeled btn-labeled-right fw border-success":"btn btn-outline-custom-secondary btn-labeled btn-labeled-right fw"}
                    onClick={this.props.onClick}>
                    <div className="left-icon" title="Clear"  onClick={this.clearDate.bind(this, this.props.fieldName)}><i className="fas fa-times font-s-16 c-red"></i></div>
                    <span className={this.props.value===""?"c-placeholder ml-4":"ml-4"}>{value}</span>
                    <b><i className="fas fa-calendar-alt font-s-16"></i></b>
                </button>
            )
        }
        else{
            return (
                <button
                    className={this.props.borderSuccess?"btn btn-outline-custom-secondary btn-labeled btn-labeled-right fw border-success":"btn btn-outline-custom-secondary btn-labeled btn-labeled-right fw"}
                    onClick={this.props.onClick}>
                    <span className={this.props.value===""?"c-placeholder":""}>{value}</span>
                    <b><i className="fas fa-calendar-alt font-s-16"></i></b>
                </button>
            )
        }
    }
}

CustomCalenderControl.defaultProps = {
    borderSuccess: false
}

CustomCalenderControl.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};