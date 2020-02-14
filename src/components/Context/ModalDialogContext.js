import React, {createContext, useReducer, useState} from 'react';

const ModalDialogContext = createContext({});

const ModalDialogContextProvider = ({children}) => {
    const [modalState, setModalState] = useState({
        active: false,
        type: null,
        msg: null,
        err: null,
        link: null
    });

    const dispatchModal = (action) => {
        setModalState({
            active: true,
            ...action,
        });

        setTimeout(() => {
            setModalState({
                active: false,
                type: null,
                msg: null,
                err: null,
                link: null
            });
        }, 4000);
    };

    return (
        <ModalDialogContext.Provider value={{modalState, dispatchModal}}>
            {children}
        </ModalDialogContext.Provider>
    );
};

const ModalDialogContextConsumer = ModalDialogContext.Consumer;

export {ModalDialogContext, ModalDialogContextProvider, ModalDialogContextConsumer};
