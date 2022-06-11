import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '../../../contexts/Constants'


const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChangeForm = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const registerSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${apiUrl}/user/register`, user)
            localStorage.setItem('firstLogin', true)
            window.location.href = '/'
        }
        catch (error) {
            alert(error.response.data.message)
        }

    }


    return (
        <div className='login-page'>
            <form onSubmit={registerSubmit} >
                <h2>Register</h2>
                <input
                    type='text'
                    name='name'
                    required
                    placeholder='Name'
                    value={user.name}
                    onChange={handleChangeForm}
                />
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
                    <button type='submit'>Register</button>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
