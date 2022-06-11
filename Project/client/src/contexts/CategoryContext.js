import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from './Constants'


export const CategoryContext = createContext()

export const CategoryContextProvider = ({ children }) => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(`${apiUrl}/api/category`)
            setCategories(res.data.categories)
        }
        getCategories()
    }, [])

    const categoryData = {
        categories,
        setCategories
    }

    return (
        <CategoryContext.Provider value={categoryData}>
            {children}
        </CategoryContext.Provider>
    )
}