import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/AuthContext'
import axios from 'axios'
import './Login.scss'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:8080/users/login', { email, password }, { withCredentials: true });
    setUser(data);
    setEmail('');
    setPassword('');
    navigate('/');
  }
  return (
    <div className='register'>
      <form action="" onSubmit={submitHandler}>
        <h1>Login</h1>
        <input type="email" placeholder='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
        <p><span>Not Registered ?</span> <Link to={'/register'} className='link' style={{ backgroundColor: 'rgb(129, 216, 245)', padding: '0.5rem' }}>Register</Link></p>
      </form>
    </div>
  )
}

export default Login