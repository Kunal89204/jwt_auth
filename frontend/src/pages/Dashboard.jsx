import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContextProvider'

const Dashboard = () => {
  const [data, setData] = useState([])
  const { user} = useContext(AuthContext)


  useEffect(() => {
    if (user && user.accessToken) {
      axios.get('http://localhost:8000/api/v1/test', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      .then((respo) => {
        setData(respo.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [user])

  return (
    <div>
      <h1>I am dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>user_id</th>
            <th>username</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
