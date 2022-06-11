import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import NotFound from '../mainpages/utils/not_found/NotFound'

const AdminRoute = ({ element: Element, ...rest }) => {
    const { authState: { isAdmin } } = useContext(AuthContext)

    if (isAdmin)
        return Element

    return <NotFound />
}

export default AdminRoute