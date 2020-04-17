import React, { useState, useContext, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { ModalDialogContext } from './Context/ModalDialogContext'
import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PopupAlert = () => {
    const { modalState } = useContext(ModalDialogContext)
    const [state, setState] = useState(modalState)
    const router = useRouter()

    useEffect(() => {
        setState({ ...modalState })

        return function cleanup () {
            if (state.link) router.push(state.link)
        }
    }, [modalState])

    const toggleModal = () => setState(!state.active)

    const Classnames = classnames(
        state.type === 'error' ? 'alert-danger' : 'alert-success'
    )

    const getMessage = () => {
        if (state.msg) return state.msg
        if (state.type === 'error') {
            if (typeof state.err === 'object') return typeof state.err === 'object' ? state.err.message : state.err
        } else return null
    }

    return (
        <Modal isOpen={state.active} toggle={toggleModal} onClick={toggleModal}>
            <ModalBody className={Classnames}>
                <p> { getMessage() } </p>
                <p> { state.link && <Link href={state.link}>See page</Link> } </p>
            </ModalBody>
        </Modal>
    )
}

export default PopupAlert
