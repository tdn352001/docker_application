import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const UserRoute = ({ element: Element, navigateIfLogged, ...rest }) => {
    const location = useLocation();
    const { authState: { isAuthenticated } } = useContext(AuthContext)

    if (navigateIfLogged && isAuthenticated) {
        return (
            <Navigate to='/' />
        )
    }

    const currentPath = location.pathname
    const loginPath = '/login'
    const registerPath = '/register'

    if (!isAuthenticated)
        if (currentPath !== loginPath && currentPath !== registerPath)
            return <Navigate to='/login' />

    return Element
}

export default UserRoute