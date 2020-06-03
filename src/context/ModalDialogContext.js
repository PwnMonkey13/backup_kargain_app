import React, { createContext, useEffect, useState } from 'react';

const ModalDialogContext = createContext({});

const ModalDialogContextProvider = ({ children }) => {
    const [state, setState] = useState({
        active: false,
        type: null,
        msg: null,
        err: null,
        link: null,
    });

    const dispatchModal = ({ persist, ...action }) => {
        const timeout = persist ? 4000000 : 4000;
        setState({
            active: true,
            ...action,
        });

        setTimeout(() => {
            setState(state => ({
                ...state,
                active: false,
            }));
        }, timeout);
    };

    useEffect(()=>{
        if(!state.active){
            setState(state => ({
                ...state,
                type: null,
                msg: null,
                err: null,
                link: null,
            }));
        }
    },[state.active])

    const dispatchModalError = (action) => dispatchModal({
        ...action,
        type: 'error',
    });

    return (
        <ModalDialogContext.Provider value={{
            modalState : state,
            dispatchModal,
            dispatchModalError,
        }}>
            {children}
        </ModalDialogContext.Provider>
    );
};

const ModalDialogContextConsumer = ModalDialogContext.Consumer;

export { ModalDialogContext, ModalDialogContextProvider, ModalDialogContextConsumer };
