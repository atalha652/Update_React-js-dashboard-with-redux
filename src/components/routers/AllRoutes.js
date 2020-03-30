import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Error404 from '../common/error404';
import App from '../../App';
import { RC_LOAD_APP, ACCOUNT_FILE, RC_LOAD_LOGIN } from './RouteConstants';
import Accounts from '../Accounts/account';
import Login from '../Authentication/loginComp';



class AllRoutes extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={RC_LOAD_LOGIN} component={Login} />

                    <ProtectedRoute exact path={RC_LOAD_APP} component={App} />
                    <ProtectedRoute exact path={ACCOUNT_FILE} component={Accounts} />

                    <ProtectedRoute path="*" component={Error404} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default AllRoutes