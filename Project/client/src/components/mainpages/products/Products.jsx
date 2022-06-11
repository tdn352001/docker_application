import React, { useContext, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import { ProductContext } from '../../../contexts/ProductContext'
import { Type } from '../../../reducers/ProductReducer'
import ProductItem from './ProductItem'
import Loading from '../utils/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'


const Products = () => {

    const {
        productState: {
            loading,
            products,
        },
        dispatch,
        getProducts,
        deleteProduct
    } = useContext(ProductContext)

    const { authState: { isAdmin } } = useContext(AuthContext)

    const [isChecked, setIsChecked] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const checkProduct = (id) => {
        let checkedCount = 0
        const updatedProducts = products.map(product => {
            if (product._id === id) {
                product.checked = !product.checked
            }
            if (product.checked) {
                checkedCount++;
            }

            return product
        })

        const isSelectedAll = checkedCount === products.length
        setIsChecked(isSelectedAll)
        dispatch({
            type: Type.SET_PRODUCTS,
            payload: updatedProducts
        })
    }

    const handleSelectAll = () => {
        const newProducts = products.map(product => {
            product.checked = !isChecked
            return product
        })

        dispatch({
            type: Type.SET_PRODUCTS,
            payload: newProducts
        })
        setIsChecked(!isChecked)
    }

    const deleteAll = async () => {
        dispatch({ type: Type.START_LOADING_PRODUCTS })
        products.forEach(async item => {
            if (item.checked) {
                await deleteProduct(item._id, item.images.public_id)
            }
        })
        await getProducts()
    }


    if (loading && !isTyping) {
        return (<>
            <div><Loading /></div>
        </>)
    }

    return (
        <>
            <Filters setIsTyping={setIsTyping} />
            {
                isAdmin && (
                    <div className="delete-all">
                        <label htmlFor="select_all">Select all</label>
                        <input type="checkbox" name="select_all" id="select_all"
                            checked={isChecked} onChange={handleSelectAll}
                        />
                        <button onClick={deleteAll}>Delete All</button>
                    </div>
                )
            }


            <div className='products'>
                {
                    products.map(product => (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                            checkProduct={checkProduct}
                        />
                    ))
                }
            </div>
            <LoadMore />

            {
                products.length === 0 && !loading ?
                    <h1>No products matched</h1> :
                    null
            }
        </>
    )
}

export default Products
