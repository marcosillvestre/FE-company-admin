import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import paths from '../constants/paths'


function PrivateRoutes({ component, isAdmin, ...rest }) {
    const localPerson = localStorage.getItem('admCo:userData')


    if (!localPerson) {
        return <Redirect to={paths.login} />
    }

    // if (isAdmin && !JSON.parse(localPerson).admins) {
    //     <Redirect to={paths.home} />
    // }


    return (
        <>
            <Route {...rest} component={component} />
        </>
    )
}

export default PrivateRoutes

PrivateRoutes.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    isAdmin: PropTypes.bool

}