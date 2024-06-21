import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext)

  if (!user || !user.accessToken) {
    // If no user or accessToken is found, redirect to login
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
