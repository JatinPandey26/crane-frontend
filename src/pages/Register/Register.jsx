import React, { useContext, useState } from 'react'
import './Register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { UserContext } from '../../Context/AuthContext'
const Register = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('https://crane-backend.vercel.app/users/register', { email, username, password }, {
            withCredentials: true,
        })
        setUser(data);
        setEmail('');
        setPassword('');
        setUsername('');
        navigate('/')
    }
    return (
        <div className='register'>
            <form action="" onSubmit={submitHandler}>
                <h1>Register</h1>
                <input type="text" placeholder='username' name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>{'Register'}</button>
                <p>Already Registered ? <Link to={'/Login'} style={{ backgroundColor: 'rgb(129, 216, 245)', padding: '0.5rem' }} className='link'>Login</Link></p>
            </form>
        </div>
    )
}

export default Register