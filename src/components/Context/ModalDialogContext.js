import React, { createContext, useReducer, useState } from 'react';

const ModalDialogContext = createContext({});

const ModalDialogContextProvider = ({ children }) => {
    const [ modalState, setModalState ] = useState({
        active : false,
        type : '',
        msg : ''
    });

    const dispatchModal = (action) =>{
        setModalState({ active : true, type : action.type, msg : action.msg || action.err.message });
        setTimeout(()=>{
            setModalState({ active : false, type : '', msg : '' });
        }, 5000);
    };

    return (
        <ModalDialogContext.Provider value={ { modalState, dispatchModal } }>
            { children }
        </ModalDialogContext.Provider>
    );
};

const ModalDialogContextConsumer = ModalDialogContext.Consumer;

export { ModalDialogContext, ModalDialogContextProvider, ModalDialogContextConsumer };
