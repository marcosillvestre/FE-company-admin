import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import paths from '../constants/paths'

import { Admin, Home, Login, Register } from '../containers'
import PrivateRoutes from './privateRoutes'

function Routes() {
    return (
        <Router>
            <Switch>
                <Route component={Login} path={paths.login} />
                <Route component={Register} path={paths.register} />


                <PrivateRoutes exact component={Home} path={paths.home} />
                <PrivateRoutes component={Home} path={paths.show} />
                <PrivateRoutes exact component={Home} path={paths.edit} />

                <PrivateRoutes component={Admin} path={paths.admin} isAdmin />
            </Switch>
        </Router>
    )
}

export default Routes