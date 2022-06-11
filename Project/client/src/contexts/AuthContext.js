import { createContext, useEffect, useReducer, useCallback } from 'react'
import { authReducer, Type } from '../reducers/AuthReducer'
import axios from 'axios'
import { apiUrl, ACCESS_TOKEN } from './Constants'
import setAuthToken from '../utils/SetAuthToken'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
        cart: [],
        history: [],
        isAdmin: false
    })

    const loadUser = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            setAuthToken(token)
        }

        try {
            const res = await axios.get(`${apiUrl}/user/information`, {
                headers: { Authorization: token }
            })


            const responseData = res.data
            dispatch({
                type: Type.SET_AUTH,
                payload: {
                    isAuthenticated: true,
                    user: responseData.data,
                    cart: responseData.data.cart,
                    isAdmin: responseData.data.role === 1
                }
            })

        } catch (err) {
            console.log({ error: err })
            logout()
        }

    }, [])

    const login = async (data) => {
        try {
            const res = await axios.post(`${apiUrl}/user/login`, data)
            if (res.data.success) {
                localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
            }

            await loadUser()

            return res.data
        } catch (error) {
            if (error.response && error.response.data)
                return error.response.data

            return { success: false, message: error.message }
        }
    }

    const register = async (data) => {
        try {
            const res = await axios.post(`${apiUrl}/user/register`, data)
            if (res.data.success) {
                localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
            }

            await loadUser()

            return res.data
        } catch (error) {
            if (error.response && error.response.data)
                return error.response.data

            return { success: false, message: error.message }
        }
    }

    const logout = () => {
        console.log('logout')
        localStorage.removeItem(ACCESS_TOKEN)
        setAuthToken(null)
        dispatch({
            type: Type.SET_AUTH,
            payload: {
                isAuthenticated: false,
                cart: [],
                isAdmin: false,
                user: null
            }
        })
    }

    const addCart = async (product) => {

        const { isAuthenticated, cart } = authState

        if (!isAuthenticated) {
            return alert('Please login to continue buying.')
        }
        let alreadyInCart = false
        const newCart = [...cart]
        for (let item of newCart) {
            if (item._id === product._id) {
                alreadyInCart = true
                item.quantity = item.quantity * 1 + 1
                break
            }
        }

        if (!alreadyInCart) {
            newCart.push({ ...product, quantity: 1 })
        }
        setCart(newCart)
        await axios.patch(`${apiUrl}/user/addcart`, { cart: newCart })
        alert('Product added to cart.')
    }

    const setCart = (newCart) => {
        dispatch({ type: Type.SET_CART, payload: newCart })
    }

    const setHistory = (newHistory) => {
        dispatch({ type: Type.SET_HISTORY, payload: newHistory })
    }

    const getHistory = async () => {
        const { isAdmin } = authState
        try {
            if (isAdmin) {
                const res = await axios.get(`${apiUrl}/api/payment`)
                setHistory(res.data.payments)
            } else {
                const res = await axios.get(`${apiUrl}/user/history`)
                setHistory(res.data.history)
            }
        }
        catch (error) {
            console.log({ error: error.response.data.message })
        }

    }

    useEffect(() => {
        loadUser()
    }, [])

    const authData = {
        authState,
        addCart,
        setCart,
        getHistory,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}