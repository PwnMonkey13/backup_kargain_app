import React, { createContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const FormContext = createContext({})
const reducer = (state, action) => {
    if (action.type === 'update') {
        return {
            ...state,
            ...action.payload
        }
    } else if (action.type === 'clear') {
        return {}
    } else {
        console.log('unknown action')
        return state
    }
}

const FormContextProvider = ({ formKey, children }) => {
    const [getFormData, setFormData, clearFormData] = useLocalStorage(`formData_${formKey.toLowerCase()}`, { currentStep: 0 })
    const [formDataContext, dispatch] = useReducer(reducer, getFormData)

    const dispatchFormUpdate = (updates) => {
        dispatch({ type: 'update', payload: updates })
    }

    const dispatchFormClear = () => {
        dispatch({ type: 'clear', payload: {} })
        clearFormData()
    }

    useEffect(() => {
        setFormData(formDataContext)
    }, [formDataContext])

    return (
        <FormContext.Provider value={{ formDataContext, dispatchFormUpdate, dispatchFormClear }}>
            {children}
        </FormContext.Provider>
    )
}

export { FormContext, FormContextProvider }
