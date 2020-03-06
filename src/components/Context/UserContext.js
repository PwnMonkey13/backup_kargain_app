import React, {createContext, useReducer, useEffect} from 'react';
import Cookies from 'js-cookie';
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
                err: action.err
            };
        default:
            console.log('unknown action');
            break;
    }
};

const UserContextProvider = ({isLoggedIn, children}) => {
    const [loggedInUser, setLoggedInUser, clearLoggedInUser] = useLocalStorage('loggedin_user', {});
    const [session, dispatch] = useReducer(reducer, {
        isLoggedIn: isLoggedIn,
        user: isLoggedIn ? loggedInUser : null
    });

    const dispatchUser = (user) => {
        setLoggedInUser(user);
        dispatch({type: 'set', payload: { user: user }});
    };

    const dispatchProxy = (action) => {
        if (action.type === 'logout') {
            console.log('dispatch logout');
            clearLoggedInUser();
            Cookies.remove('token', { path: '/' }); // removed!
            dispatch({type: 'logout'});
        }
        // if (action.type === 'checkToken') {
        //     AuthService.authorize()
        //         .then(data => {
        //             const {user} = data;
        //             dispatch({type: 'set', payload: {user, isLoggedIn: true}});
        //         })
        //         .catch(err => {
        //             clearLoggedInUser();
        //             Cookies.remove('name', { path: '' }) // removed!
        //             dispatch({type: 'logout', err});
        //         });
        //
        // }
        else if (action.type === 'loginSuccess') {
            Cookies.set('token', action.payload.token);
            setLoggedInUser(action.payload.user);
            dispatch({type: 'set', payload: {user: action.payload.user, isLoggedIn: true}});
        } else {
            dispatch(action);
        }
    };

    useEffect(() => {
        if (!session.isLoggedIn) dispatchProxy({type: 'logout', err: "Unauthorized"})
    }, []);

    return (
        <UserContext.Provider value={{session, dispatch: dispatchProxy, dispatchUser}}>
            {children}
        </UserContext.Provider>
    );
};

const UserContextConsumer = UserContext.Consumer;

export {UserContext, UserContextProvider, UserContextConsumer};
