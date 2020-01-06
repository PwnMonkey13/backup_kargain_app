import React, { createContext, useReducer, useEffect } from 'react';
import AuthService from '../services/AuthService'
import useRememberState from '../libs/useRememberState'
const UserContext = createContext({});

const reducer = (state, action) => {
    switch (action.type) {
        case 'set':
            return {
                ...state,
                ...action.data
            };
        case 'clear':
            return {
                isLoggedIn: false,
                user: {},
            };
        default:
            throw new Error();
    }
};

const UserContextProvider = ({ children }) => {
    const [ userLocal, setUserLocal ] = useRememberState('user');
    console.log(userLocal);
    const [session, dispatch] = useReducer(reducer, { isLoggedIn: false, user: userLocal });

    const dispatchProxy = (action) => {
        if (action.type === 'fetch') {
            AuthService.authorizeUser()
                .then(data => {
                    dispatch({ type: 'set', data : { user : data } });
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type : 'clear' });
                });
        } else {
            return dispatch(action);
        }
    };

    useEffect(async () => {
        await dispatchProxy({ type: 'fetch' });
    }, []);

    useEffect(() => {
        setUserLocal(JSON.stringify(session.user));
    }, [session.user]);

    return (
        <UserContext.Provider value={{ session, dispatch: dispatchProxy }}>
            { children }
        </UserContext.Provider>
    );
};

const UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };
