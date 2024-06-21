import axios from 'axios'
import React, { createContext, useEffect, useReducer } from 'react'


export const AuthContext = createContext()

const User = {
    user: JSON.parse(localStorage.getItem('user')) || false
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state;
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, User)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))



        if (user) {

            axios.get('http;//localhost:8000/api/v1/validate-token', {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then(response => {
                if (response.status === 200 && response.data.valid) {
                    dispatch({ type: 'LOGIN', payload: user })
                } else if (response.data.error) {
                    localStorage.removeItem('user')
                    dispatch({ type: 'LOGOUT' })
                }
            })
                .catch(error => {
                    // Token is invalid or request failed
                    localStorage.removeItem('user')
                    dispatch({ type: 'LOGOUT' })
                })


        }
    }, [])
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
