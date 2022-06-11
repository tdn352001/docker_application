import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Menu, Close, Cart } from '../../assets/icons'
import { Link } from 'react-router-dom'


const Header = () => {

    const { authState: { isAuthenticated, cart, isAdmin }, logout } = useContext(AuthContext)

    const [menu, setMenu] = useState(false)


    const logoutUser = async () => {
        logout()
        window.location.href = '/'
    }

    const adminRouter = () => (
        <>
            <li><Link to='/create_product'>Create Product</Link></li>
            <li><Link to='/category'>Categories</Link></li>
        </>
    )

    const loggedRouter = () => (
        <>
            <li><Link to='/history'>History</Link></li>
            <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
        </>
    )


    const toggleMenu = () => setMenu(!menu)
    const styleMenu = {
        left: menu ? 0 : '-100%'
    }

    return (
        <header>
            <div className='menu' onClick={toggleMenu}>
                <img src={Menu} alt='menu' width='30' />
            </div>

            <div className='logo'>
                <h1>
                    <Link to='/'>{isAdmin ? 'Admin' : 'SD SHOP'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link></li>
                {
                    isAdmin && adminRouter()
                }

                {
                    isAuthenticated ?
                        loggedRouter() : (
                            <li><Link to='/login'>Login | Register</Link></li>
                        )
                }
                <li onClick={toggleMenu}>
                    <img src={Close} alt='close' width='30' className='menu' />
                </li>
            </ul>

            {
                isAdmin ? null : (
                    <div className='cart-icon'>
                        <span>{cart ? cart.length : 0}</span>
                        <Link to='/cart'>
                            <img src={Cart} alt='close' width='30' />
                        </Link>
                    </div>
                )
            }

        </header>
    )
}

export default Header
