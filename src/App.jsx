import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import Navbar from './Components/Navbar/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { UserContext } from './Context/AuthContext'
import axios from 'axios'
import CreateNote from './pages/CreateNote/CreateNote'
import Explore from './pages/Explore/Explore'
import Dashboard from './pages/DashBoard/Dashboard'

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fecthUser = async () => {
      const { data } = await axios.get('https://crane-backend.vercel.app/users/me', { withCredentials: true })
      setUser(data)
    }
    fecthUser()
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}> <Navbar />
        <Routes>

          <Route path='/' element={user ? <Home /> : <Navigate replace to={"/explore"} />} />
          <Route path='/create-note' element={user ? <CreateNote /> : <Navigate replace to={"/explore"} />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate replace to={"/"} />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate replace to={"/"} />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/dashboard' element={user?.isAdmin ? <Dashboard /> : <Navigate replace to={'/'} />} />
        </Routes></UserContext.Provider>
    </div>
  )
}

export default App
