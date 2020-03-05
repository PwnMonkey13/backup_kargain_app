import React, { useState, useContext, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {ModalDialogContext} from "./Context/ModalDialogContext";
import classnames from 'classnames';
import Link from "next/link";
import {useRouter} from "next/router";

const PopupAlert = () => {
    const { modalState } = useContext(ModalDialogContext);
    const [state, setState] = useState(modalState);
    const router = useRouter();

    useEffect(() => {
        setState({ ...modalState });

        return function cleanup(){
            if(state.link) router.push(state.link);
        }
    }, [modalState]);

    const toggleModal = () => setState(!state.active);

    const Classnames = classnames(
        state.type === "error" ? 'alert-danger' : 'alert-success',
    );

    return (
        <Modal isOpen={state.active} toggle={toggleModal} onClick={toggleModal}>
            <ModalBody className={Classnames}>
                {/*{ state.type === "error" ? state.err : state.msg }*/}
                { state.link && <Link href={state.link}>See page</Link> }
            </ModalBody>
        </Modal>
    );
};

export default PopupAlert;
