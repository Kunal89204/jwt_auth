import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContextProvider'

const Home = () => {
  const {user} = useContext(AuthContext)
  console.log(user.accessToken)
  return (
    <>
    <div>
      {user.accessToken?<p>hello</p>:<p>bye</p>}
    </div>
    </>
  )
}

export default Home
