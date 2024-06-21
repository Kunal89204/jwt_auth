import React from 'react'

const useRegister = () => {


  const  register = (username, password) => {
    console.log({username, password})
    }

  return {register}
}

export default useRegister
