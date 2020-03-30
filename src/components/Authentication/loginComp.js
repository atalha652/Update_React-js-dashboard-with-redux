import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter, Redirect } from 'react-router-dom'
import { login } from '../../actions/index';
import { Notifications } from '../common/notification';
import { RC_LOAD_APP } from '../routers/RouteConstants';
import { saveUser, getUser } from '../../actions/session';
import { isNonEmptyDict } from '../../actions/validator';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails: { username: "", password: "" },
        }

        this.chkUser = this.chkUser.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.handleValue = this.handleValue.bind(this)
    }

    componentDidMount() {
        this.chkUser();
    }

    componentWillReceiveProps(newProps) {
        let { activeUser } = newProps;
        if (isNonEmptyDict(activeUser)) {
            saveUser(activeUser)
            this.props.history.push(RC_LOAD_APP)
            Notifications.notify("Login Successfully", "Login", "success");
        }

    }

    chkUser() {
        let current_user = getUser()
        if (current_user) {
            this.props.history.push(RC_LOAD_APP);
        }
    }

    handleValue(e) {
        let { name, value } = e.target;
        let { userDetails } = this.state;
        userDetails[name] = value

        this.setState({ userDetails })
    }

    clearForm() {
        let userDetails = { username: "", password: "" }
        this.setState({ userDetails })
    }

    onLogin() {
        let { userDetails } = this.state;
        this.props.login(userDetails);
    }

    render() {
        const { userDetails } = this.state
        let { username, password } = userDetails

        return (
            <div className="text-center page-login">
                <div>
                    <img className="mb-4" src="" alt="" width="300" height="150" />
                    <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>

                    <label className="sr-only">Email address</label>
                    <input type="text" name="username" className="form-control" value={username} onChange={this.handleValue} placeholder="Enter email" />

                    <label className="sr-only">Password</label>
                    <input type="password" name="password" className="form-control" value={password} onChange={this.handleValue} placeholder="Enter password" />

                    <button className="btn btn-lg btn-info btn-block" type="submit" onClick={this.onLogin} >Sign in</button>

                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ activeUser }) {
    return { activeUser }
}

export default connect(mapStateToProps, { login })(withRouter(Login));