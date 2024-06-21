import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'


const Navbar = () => {
  const { user  } = useContext(AuthContext)
  const {logout} = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold flex gap-10">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <ul className="flex space-x-4 text-white">
          {user ? (
            <>
              <li>Welcome, {user.name}</li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
