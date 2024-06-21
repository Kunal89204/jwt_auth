import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

const useLogout = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return { logout }
}

export default useLogout
