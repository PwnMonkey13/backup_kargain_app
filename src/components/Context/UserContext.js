import React, { createContext, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'
import AuthService from '../../services/AuthService'

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
        user: loggedInUser
    })

    const dispatchUser = (user) => {
        dispatch({
            type: 'set',
            payload: { user: user }
        })
    }

    const dispatchProxy = (action) => {
        if (action.type === 'logout') {
            console.log('dispatch logout')
            Cookies.remove('token', { path: '/' }) // removed!
            dispatch({ type: 'logout' })
        }

        if (action.type === 'checkToken') {
            AuthService.authorize()
                .then(isLoggedIn => {
                    dispatch({type: 'set', payload: {...session, isLoggedIn: isLoggedIn}});
                })
                .catch(err => {
                    Cookies.remove('token', { path: '' }) // removed!
                    dispatch({type: 'logout', err});
                });

        }
        else if (action.type === 'loginSuccess') {
            dispatch({
                type: 'set',
                payload: {
                    user: action.payload.user,
                    isLoggedIn: true
                }
            })
        } else {
            dispatch(action)
        }
    }

    useEffect(() => {
        if (!session.isLoggedIn) {
            dispatchProxy({
                type: 'logout',
                err: 'Unauthorized'
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{
            session,
            dispatch: dispatchProxy,
            dispatchUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

const UserContextConsumer = UserContext.Consumer

export { UserContext, UserContextProvider, UserContextConsumer }
