import React, { createContext, useReducer, useEffect } from 'react';
import Cookie from 'js-cookie';
import AuthService from '../../services/AuthService'
import useLocalStorage from '../../hooks/useLocalStorage'
const UserContext = createContext({});

const reducer = (state, action) => {
    switch (action.type) {
        case 'set':
            return {
                ...state,
                ...action.payload
            };
        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token : null,
                err : action.err
            };
        default:
            console.log('unknown action');
            break;
    }
};

const UserContextProvider = ({ children }) => {
    const [ loggedInUser, setLoggedInUser, clearLoggedInUser ] = useLocalStorage('loggedin_user', null);
    const [session, dispatch] = useReducer(reducer, {
        isLoggedIn: loggedInUser !== null,
        user : loggedInUser
    });

    const dispatchProxy = (action) => {
        if (action.type === 'logout') {
            clearLoggedInUser();
            Cookie.remove('token');
            dispatch({ type : 'logout'});
            console.log('zzefzf');
        }
        if (action.type === 'checkToken') {
            AuthService.authorize()
                .then(data => {
                    const { user } = data;
                    dispatch({ type: 'set', payload : { user, isLoggedIn : true } });
                })
                .catch(err => {
                    clearLoggedInUser();
                    Cookie.remove('token');
                    dispatch({ type : 'logout', err });
                });

        } else if(action.type === 'loginSuccess') {
            Cookie.set('token', action.payload.token);
            setLoggedInUser(action.payload.user);
            dispatch({ type : 'set', payload : { user : action.payload.user , isLoggedIn : true } });
       } else {
            dispatch(action);
       }
    };

    // useEffect(() => {
    //     dispatchProxy({ type : 'logout', err : "Unauthorized" })
    // }, []);

    return (
        <UserContext.Provider value={{ session, dispatch: dispatchProxy }}>
            { children }
        </UserContext.Provider>
    );
};

const UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };
