import { createContext, useEffect, useState, useCallback, useReducer } from 'react'
import { productReducer, Type } from '../reducers/ProductReducer'
import axios from 'axios'
import { apiUrl } from './Constants'


export const ProductContext = createContext()
export const ProductContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(productReducer, {
        loading: true,
        products: [],
        filters: {
            category: '',
            sort: '',
            keyWord: '',
            page: 1,
            result: 0
        }
    })


    const getProducts = useCallback(async () => {
        dispatch({ type: Type.START_LOADING_PRODUCTS })
        const { filters } = state
        try {
            const res = await axios.get(`${apiUrl}/api/products?limit=${filters.page * 12}&${filters.category}&${filters.sort}&title[regex]=${filters.keyWord}`)
            console.log(res.data)
            dispatch({
                type: Type.SET_STATE,
                payload: {
                    products: res.data.products,
                    filters: { ...filters, result: res.data.result }
                }
            })
            return res.data.products
        }
        catch (error) {
            dispatch({ type: Type.PRODUCTS_LOADED_FAILED })
            console.log(error)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.filters.page, state.filters.category, state.filters.keyWord, state.filters.sort])

    const addProduct = async (data) => {
        try {
            const res = await axios.post(`${apiUrl}/api/products`, data)
            await getProducts()
            return res.data
        } catch (error) {
            if (error.response && error.response.data)
                return error.response.data

            return { success: false, message: error.message }
        }
    }

    const updateProduct = async (id, data) => {
        try {
            const res = await axios.put(`${apiUrl}/api/products/${id}`, data)
            await getProducts()
            return res.data
        } catch (error) {
            if (error.response && error.response.data)
                return error.response.data

            return { success: false, message: error.message }
        }
    }

    const deleteProduct = async (id, public_id, token) => {
        try {
            await axios.post(`${apiUrl}/api/destroy`, { public_id: public_id })

            await axios.delete(`${apiUrl}/api/products/${id}`)
            await getProducts()

            return {
                message: 'Product deleted'
            }
        }
        catch (error) {
            if (error.response && error.response.data)
                return error.response.data

            return { success: false, message: error.message }
        }
    }

    const setFilters = (filters) => {
        dispatch({ type: Type.SET_FILTERS, payload: filters })
    }

    useEffect(() => {
        getProducts()
    }, [getProducts, state.filters.page, state.filters.category, state.filters.keyWord, state.filters.sort])

    const productData = {
        productState: state,
        Type,
        dispatch,
        setFilters,
        addProduct,
        updateProduct,
        deleteProduct,
    }

    return (
        <ProductContext.Provider value={productData}>
            {children}
        </ProductContext.Provider>
    )
}