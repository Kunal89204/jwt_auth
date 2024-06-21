import axios from 'axios'
import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContextProvider'


const useLogin = () => {
  const { dispatch } = useContext(AuthContext)
  const login = (username, password) => {
    const data = { username, password }
    axios.post('http://localhost:8000/api/v1/login', data)
      .then((respo) => {
        if (respo.data.accessToken) {
          console.log(respo.data.accessToken)
          localStorage.setItem('user', JSON.stringify(respo.data))
          dispatch({ type: 'LOGIN', payload: respo.data });
        } else {
          console.log(respo.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return { login }
}

export default useLogin
