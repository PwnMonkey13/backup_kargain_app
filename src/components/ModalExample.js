import React, { useState, useContext, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {ModalDialogContext} from "./Context/ModalDialogContext";
import classnames from 'classnames';

const ModalExample = () => {
    const { modalState } = useContext(ModalDialogContext);
    const [state, setState] = useState({
        active : false,
        err : 'error',
        msg : ''
    });

    useEffect(() => {
        setState({
            active : modalState.active,
            type : modalState.type,
            msg : modalState.msg
        });
    }, [modalState]);

    const toggleModal = () => setState(!state.active);
    const Classnames = classnames(
        state.type === "error" ? 'alert-danger' : 'alert-success',
    );

    return (
        <Modal isOpen={state.active} toggle={toggleModal} onClick={toggleModal}>
            <ModalBody className={Classnames}>
                { state.msg }
            </ModalBody>
        </Modal>
    );
};

export default ModalExample;
