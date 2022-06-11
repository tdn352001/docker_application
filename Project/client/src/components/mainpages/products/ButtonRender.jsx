import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext'
import { ProductContext } from '../../../contexts/ProductContext'

const ButtonRender = ({ product, setLoading }) => {


    const { deleteProduct } = useContext(ProductContext)
    const { authState: { isAdmin }, addCart } = useContext(AuthContext)


    const handleDeleteProduct = async (e) => {
        e.preventDefault()
        if (window.confirm('Are you sure you want to delete this product?')) {
            setLoading(true)
            await deleteProduct(product._id, product.images.public_id)
            setLoading(false)
        }
    }

    return (
        <div className='row_btn'>
            {
                isAdmin ? (
                    <>
                        <Link className='btn_buy' to='#!' onClick={handleDeleteProduct}>
                            Delete
                        </Link>

                        <Link className='btn_view' to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className='btn_buy' to='#!' onClick={() => addCart(product)}>
                            Buy
                        </Link>

                        <Link className='btn_view' to={`/product/${product._id}`}>
                            View
                        </Link>
                    </>
                )
            }
        </div>
    )
};

export default ButtonRender;
