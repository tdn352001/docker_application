import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ProductContext } from '../../../contexts/ProductContext'
import { AuthContext } from '../../../contexts/AuthContext'
import ProductItem from './ProductItem'

const DetailProduct = () => {

    const { productState: { products } } = useContext(ProductContext)
    const { addCart } = useContext(AuthContext)


    const [relatedProducts, setRelatedProducts] = useState([])
    const [detailProduct, setDetailProduct] = useState(null)

    const params = useParams()
    // GET PRODUCT SELECTED FROM PARAMS
    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if (product._id === params.id) {
                    setDetailProduct(product)
                }
            })
        }
    }, [params, products])

    // GET RELATED PRODUCTS

    useEffect(() => {
        console.log('Update')
        if (detailProduct) {
            const relatedProductsList = products.filter(product => product.category === detailProduct.category && product._id !== detailProduct._id)
            setRelatedProducts(relatedProductsList)
        }
    }, [products, detailProduct])

    if (!detailProduct) return null

    return (
        <>
            <div className='detail'>
                <img src={detailProduct.images.url} alt='thumbnail' />
                <div className='box-detail'>
                    <div className='row'>
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.productId}</h6>
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link
                        className='cart'
                        to='/cart'
                        onClick={() => addCart(detailProduct)}>
                        Buy Now
                    </Link>
                </div>
            </div>
            {
                relatedProducts.length > 0 ? (
                    <div>
                        <h2>Related products</h2>
                        <div className='products'>
                            {
                                relatedProducts.map(product => (
                                    <ProductItem product={product} key={product._id} />
                                ))
                            }
                        </div>
                    </div>
                ) : null
            }

        </>
    )
};

export default DetailProduct;
