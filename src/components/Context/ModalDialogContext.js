import React, { createContext, useReducer, useState } from 'react'

const ModalDialogContext = createContext({})

const ModalDialogContextProvider = ({ children }) => {
    const [modalState, setModalState] = useState({
        active: false,
        type: null,
        msg: null,
        err: null,
        link: null
    })

    const dispatchModal = ({ persist, ...action }) => {
        const timeout = persist ? 4000000 : 4000
        setModalState({
            active: true,
            ...action
        })

        setTimeout(() => {
            setModalState({
                active: false,
                type: null,
                msg: null,
                err: null,
                link: null
            })
        }, timeout)
    }

    const dispatchModalError = (action) => dispatchModal({ ...action, type: 'error' })

    return (
        <ModalDialogContext.Provider value={{ modalState, dispatchModal, dispatchModalError }}>
            {children}
        </ModalDialogContext.Provider>
    )
}

const ModalDialogContextConsumer = ModalDialogContext.Consumer

export { ModalDialogContext, ModalDialogContextProvider, ModalDialogContextConsumer }
