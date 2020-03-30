import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import _ from "lodash"

import { RC_ERROR_404, RC_LOAD_LOGIN } from './RouteConstants';
import { GetPath, isValidJSON, getPermissions } from '../../actions/helper';

import { connect } from "react-redux";
import { fetchUser } from '../../actions';
import CustomLoader from '../common/loader';
import { RC_LOAD_APP } from './RouteConstants';
import LOGIN from '../Authentication/loginComp';


class ProtectedRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validToken: false
        }

        this.isAuthorizedRoute = this.isAuthorizedRoute.bind(this);
        this.CheckForToken = this.CheckForToken.bind(this);
    }

    componentDidMount() {
        if (_.isEmpty(this.props.activeUser)) {
            this.props.fetchUser();
        }
    }

    /**
     * check the current routing url against authorized urls of users
     */
    isAuthorizedRoute() {
        var path = GetPath(this.props.path);
        var user_permission = getPermissions(this.props.activeUser);
        // var user_permission = [...this.state.permission];
        var idx = user_permission.indexOf(path);

        if (path === "*")
            return true;

        return (idx >= 0);
    }

    isLoginPath() {
        var path = GetPath(this.props.path);
        if (path === RC_LOAD_LOGIN) {
            return true;
        }
        return false;
    }

    checkFor404() {
        var path = GetPath(this.props.path);
        return path === RC_ERROR_404
    }

    /**
     * check that user is logged in or not
     */
    CheckForToken() {
        if (isValidJSON(localStorage.getItem('user'))) {
            var user = JSON.parse(localStorage.getItem('user'));
            if (user && typeof (user) !== 'string') {
                if ("id" in user && "token" in user) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Main render Function
     * ------------------------------
     * 
     */
    render() {
        const { component: Component, ...props } = this.props
        var __html = <div className="d-flex justify-content-center align-items-center loading-main">
            <CustomLoader width={200} height={200} customstyles={{}} />
        </div>

        /* if user is logged in */
        if (this.CheckForToken()) {

            /* first fetch the user details from server */
            if (!_.isEmpty(this.props.activeUser)) {
                if ('message' in this.props.activeUser) {
                    localStorage.removeItem('user');
                    __html =
                        <Route
                            {...props}
                            render={props => <Redirect to={RC_LOAD_LOGIN} />}
                        />
                }

                else if (this.isLoginPath()) {
                    __html =
                        <Route
                            {...props}
                            render={props => <Redirect to={RC_LOAD_APP} />}
                        />
                }

                else if (this.isAuthorizedRoute()) {
                    __html =
                        <Route
                            {...props}
                            render={props => <Component {...props} />}
                        />
                }
                else {
                    __html =
                        <Route
                            {...props}
                            render={props => <Redirect to={RC_ERROR_404} />}
                        />
                }
            }
        }
        else {

            localStorage.removeItem('user');
            if (this.isLoginPath()) {
                __html =
                    <Route
                        {...props}
                        render={props => <Component {...props} />}
                    />
            }
            else {
                __html =
                    <Route
                        {...props}
                        render={props => <Redirect to={RC_LOAD_LOGIN} />}
                    />
            }
        }

        return __html;
    }
}

function mapStateToProps({ activeUser }) {
    return { activeUser }
}

export default connect(mapStateToProps, { fetchUser })(ProtectedRoute);