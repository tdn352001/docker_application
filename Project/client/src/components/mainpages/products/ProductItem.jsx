import React, { useState } from 'react';
import Loading from '../utils/loading/Loading';
import ButtonRender from './ButtonRender';

const ProductItem = ({ product, isAdmin, checkProduct }) => {

    const [loading, setLoading] = useState(false)




    if (loading) {
        return (
            <div className="product_card">
                <Loading />/
            </div>
        )
    }

    return (
        <div className='product_card'>
            {
                isAdmin &&
                (
                    <input type='checkbox' checked={product.checked} onChange={() => checkProduct(product._id)} />
                )
            }
            <img src={product.images.url} alt='product' />
            <div className='product_box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            <ButtonRender product={product} setLoading={setLoading} />
        </div>

    )
};

export default ProductItem;
