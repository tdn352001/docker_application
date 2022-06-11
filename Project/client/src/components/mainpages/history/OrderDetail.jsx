import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import NotFound from '../utils/not_found/NotFound'

const OrderDetail = () => {

    const { authState: { history } } = useContext(AuthContext)


    const [orderDetail, setOrderDetail] = useState(null)
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) {
                    setOrderDetail(item)
                    return
                }
            })
        }
    }, [params.id, history])

    console.log(orderDetail)

    if (!orderDetail) {
        return <NotFound />
    }

    return (
        <div className='history-page'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {orderDetail.address.recipient_name}
                        </td>
                        <td>
                            {`${orderDetail.address.line1} - ${orderDetail.address.city}`}
                        </td>
                        <td>
                            {orderDetail.address.postal_code}
                        </td>
                        <td>
                            {orderDetail.address.country_code}
                        </td>
                    </tr>
                </tbody>
            </table>

            <table style={{ margin: '30px 0px' }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetail.cart.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.images.url} alt='thumbnail' /></td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetail