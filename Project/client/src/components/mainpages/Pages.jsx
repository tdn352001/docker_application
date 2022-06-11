import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminRoute from '../routing/AdminRoute'
import UserRoute from '../routing/UserRoute'
import Login from './auth/Login'
import Register from './auth/Register'
import Product from './products/Products'
import DetailProduct from './products/DetailProduct'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import OrderHistory from './history/OrderHistory'
import OrderDetail from './history/OrderDetail'
import Categories from './categories/Categories'
import CreateProduct from './products/CreateProduct'

const Pages = () => {

    return (
        <Routes>
            <Route path='/' element={<Product />} />

            <Route path='/product/:id' element={<DetailProduct />} />

            <Route path='/login' element={(<UserRoute element={<Login />} navigateIfLogged={true} />)} />

            <Route path='/register' element={<UserRoute element={<Register />} navigateIfLogged={true} />} />

            <Route path='/history/:id' element={<UserRoute element={<OrderDetail />} />} />

            <Route path='/history' element={<UserRoute element={<OrderHistory />} />} />

            <Route path='/category' element={<AdminRoute element={<Categories />} />} />

            <Route path='/create_product' element={<AdminRoute element={<CreateProduct />} />} />

            <Route path='/edit_product/:id' element={<AdminRoute element={<CreateProduct />} />} />

            <Route path='/cart' element={<Cart />} />

            <Route path='*' element={<NotFound />} />

        </Routes>
    )
}

export default Pages
