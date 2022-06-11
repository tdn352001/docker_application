import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
import { AuthContextProvider } from './contexts/AuthContext'
import { CategoryContextProvider } from './contexts/CategoryContext'
import { ProductContextProvider } from './contexts/ProductContext'
import './assets/css/App.css';

const App = () => {
    return (
        <AuthContextProvider>
            <CategoryContextProvider>
                <ProductContextProvider>
                    <Router>
                        <div className='App'>
                            <Header />
                            <Pages />
                        </div>
                    </Router>
                </ProductContextProvider>
            </CategoryContextProvider>
        </AuthContextProvider>
    )
}

export default App
