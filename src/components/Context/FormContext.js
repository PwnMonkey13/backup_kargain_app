import React, {useMemo, useCallback, createContext, useEffect, useReducer} from "react";
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
        return state;
    }
};

const FormContextProvider = ({children}) => {
    const isMountRef = useIsMounted();
    const [getFormData, setFormData, clearFormData ] = useLocalStorage("formData", {currentStep : 0});
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

    console.log("formContextProvider render");

    return (
        <FormContext.Provider value={{formDataContext, dispatchFormUpdate, dispatchFormClear }}>
            {children}
        </FormContext.Provider>
    );
};

export {FormContext, FormContextProvider};
