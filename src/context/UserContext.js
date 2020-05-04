import React, { createContext, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'
import AuthService from '../services/AuthService'
import User from '../class/user.class'

const UserContext = createContext({})

const reducer = (state, action) => {
    switch (action.type) {
    case 'set':
        return {
            ...state,
            ...action.payload
        }
    case 'logout':
        return {
            ...state,
            isLoggedIn: false,
            user: null,
            err: action.err
        }
    default:
        console.log('unknown action')
        break
    }
}

const UserContextProvider = ({ isLoggedIn, loggedInUser, children }) => {
    const [session, dispatch] = useReducer(reducer, {
        isLoggedIn: isLoggedIn,
        user : loggedInUser
    })

    const dispatchLogout = () => {
        console.log('dispatch logout')
        Cookies.remove('token', { path: '/' }) // removed!
        dispatch({ type: 'logout' })
    }

    const dispatchLoginSuccess = (action) => {
        console.log('dispatch login success')
        dispatch({
            type: 'set',
            payload: {
                user: action.payload.user,
                isLoggedIn: true
            }
        })
    }

    useEffect(() => {
        if (!session.isLoggedIn) {
            dispatchLogout()
        }
    }, [])

    return (
        <UserContext.Provider value={{
            session,
            dispatchLoginSuccess,
            dispatchLogout,
        }}>
            {children}
        </UserContext.Provider>
    )
}

const UserContextConsumer = UserContext.Consumer

export { UserContext, UserContextProvider, UserContextConsumer }
