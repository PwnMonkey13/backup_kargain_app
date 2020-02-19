import React, {createContext, useReducer} from 'react';
import useLocalStorage from '../../hooks/useLocalStorage'

const FormContext = createContext({});

const reducer = (state, action) => {
    if (action.type === 'update') {
        return {
            ...state,
            [action.name]: action.value
        };
    } else {
        console.log('unknown action');
    }
};

const FormContextProvider = ({children}) => {
    const [formDataLS, setFormDataLS, clearFormDataLS] = useLocalStorage('formData', {});
    const [formDataState, dispatch] = useReducer(reducer, {});

    const dispatchFormUpdate = (action) => {
        if (action.type === 'update') {
            dispatch(action);
            // setFormDataLS({...formDataState, [action.name]: action.value});
        } else if (action.type === 'clear') {
            dispatch({type: 'clear', payload: {}});
            clearFormDataLS();
        } else {
            console.log('form reducer action not set');
        }
    };

    return (
        <FormContext.Provider value={{formDataState, dispatchFormUpdate}}>
            {children}
        </FormContext.Provider>
    );
};

const FormContextConsumer = FormContext.Consumer;

export {FormContext, FormContextProvider, FormContextConsumer};
