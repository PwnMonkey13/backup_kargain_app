import React, {createContext, useEffect, useReducer} from "react";
import {flatten, inflate} from 'flattenjs';
import useLocalStorage from "../../hooks/useLocalStorage";
import useIsMounted from "../../hooks/useIsMounted";

const FormContext = createContext({});

const reducer = (state, action) => {
    if (action.type === "update") {
        return {
            ...state,
            ...action.payload
        };
    } else if (action.type === "clear") {
        return {};
    } else {
        console.log("unknown action");
    }
};

const FormContextProvider = ({children}) => {
    const isMountRef = useIsMounted();
    const [ getFormData, setFormData, clearFormData ] = useLocalStorage("formData");
    const [formDataContext, dispatch] = useReducer(reducer, getFormData);

    const dispatchFormUpdate = (updates) => {
        // dispatch({type: "update", payload: flatten(updates)});
        dispatch({type: "update", payload: updates});

    };

    const dispatchFormClear = () => {
        dispatch({type: "clear", payload: {}});
        clearFormData();
    };

    useEffect(() => {
        if(isMountRef){
            // const updatedDataContext = inflate(formDataContext);
            // const updatedDataContext = formDataContext;
            // setFormData(updatedDataContext);
            setFormData(formDataContext);
        }
    }, [formDataContext]);

    return (
        <FormContext.Provider value={{formDataContext, dispatchFormUpdate, dispatchFormClear }}>
            {children}
        </FormContext.Provider>
    );
};

const FormContextConsumer = FormContext.Consumer;

export {FormContext, FormContextProvider, FormContextConsumer};
