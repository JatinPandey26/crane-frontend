import React, { useContext, useEffect } from 'react'
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/AuthContext'
import axios from 'axios'
import { FaBars } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigate();
  const logoutHandler = async () => {
    await axios.get('http://localhost:8080/users/logout', { withCredentials: true })
    setUser(null)
    navigation('/')
  }

  

 
  return (
    <nav className='navbar'>
      <button className='navToggle' onClick={() => setIsOpen(!isOpen)}>{isOpen ? <RxCross1 /> : <FaBars />}</button>
      {
        isOpen && <div className="left">
          {
            user && (<><span><Link to={'/'} className='link'>Home</Link></span>
              <span><Link to={'/create-note'} className='link'>Create Note</Link></span></>)
          }
          <span><Link to={'/explore'} className='link'>Explore</Link></span>
          {
            user?.isAdmin && <span><Link to={'/dashboard'} className='link'>Dashboard</Link></span>
          }
        </div>
      }
      <div className="right">
        {user && <div className="user"> <img src="/noavtar.png" alt="" /> <span>{user.username}</span></div>}
        <Link className='link' to={user ? '/logout' : '/login'}> <span>{user ? <button onClick={logoutHandler}>Logout</button> : <button>Login/Signup</button>}</span> </Link>
      </div>
    </nav>
  )
}

export default Navbar