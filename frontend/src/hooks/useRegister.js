import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import axios from 'axios'


const useRegister = () => {

  const { dispatch } = useContext(AuthContext)


  const register = (username, password) => {

    const data = { username, password }
    axios.post('http://localhost:8000/api/v1/register', data)
      .then((respo) => {
        console.log(respo.data);
        localStorage.setItem('user', JSON.stringify(respo.data))
        dispatch({ type: 'LOGIN', payload: respo.data });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  return { register }
}

export default useRegister
