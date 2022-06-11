import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './../../../contexts/AuthContext'


const Login = () => {
    const { login } = useContext(AuthContext)
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    const handleChangeForm = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const loginSubmit = async (e) => {
        e.preventDefault()
        const result = await login(user)

        alert(result.message)
        if (result.success) {
            console.log(result)
            navigate('/')
        }
    }


    return (
        <div className='login-page'>
            <form onSubmit={loginSubmit} >
                <h2>Login</h2>
                <input
                    type='email'
                    name='email'
                    required
                    placeholder='Email'
                    value={user.email}
                    onChange={handleChangeForm}
                />
                <input
                    type='password'
                    name='password'
                    required
                    placeholder='Password'
                    autoComplete='true'
                    value={user.password}
                    onChange={handleChangeForm}
                />
                <div className='row'>
                    <button type='submit'>Login</button>
                    <Link to='/register'>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
