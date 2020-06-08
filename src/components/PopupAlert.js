import React, { useContext, useEffect, useState } from 'react';
import Link from 'next-translate/Link';
import CloseIcon from '@material-ui/icons/Close';
import { Modal } from 'reactstrap';
import { ModalDialogContext } from '../context/ModalDialogContext';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { themeColors } from '../theme/palette';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    rootClass: {},
    wrapClass: {},
    modalClass: {},
    modalClose: {
        position: 'absolute',
        zIndex: 5,
        top: 0,
        right: 0,
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        transition: 'all .3s',
        transformOrigin: '50% 50%',
    },
    modalSuccess: {
        backgroundColor: themeColors.green,
        color: themeColors.white,
    },
    modalWarning: {
        backgroundColor: themeColors.red,
        color: themeColors.white,
    },
    modalInfo: {
        backgroundColor: themeColors.blue,
        color: themeColors.white,
    },
}));

const PopupAlert = () => {
        const classes = useStyles();
        const { modalState } = useContext(ModalDialogContext);
        const [state, setState] = useState(modalState);

        useEffect(() => {
            setState({ ...modalState });
        }, [modalState]);

        const toggleModal = () => {
            setState(!state.active);
        };

        const getMessage = () => {
            if (state.msg) return state.msg;
            if (state.type === 'error') {
                if (typeof state.err === 'object') {
                    return `[${state.err?.statusCode}] ${state.err?.name} : ${state.err?.message}`;
                }
                return state.err;
            }
            return null;
        };

        return (
            <Modal className={classes.rootClass} zIndex={1601}
                   wrapClassName={classes.wrapClass}
                   modalClassName={classes.modalClass}
                   contentClassName={state.err ? classes.modalWarning : classes.modalSuccess}
                   isOpen={state.active}
                   toggle={toggleModal}>
                <button type="button" onClick={toggleModal} className={clsx('svgHoverScale', classes.modalClose)}
                        aria-label="close-modal">
                    <CloseIcon/>
                </button>
                <div className="modal-body">
                    <p> {getMessage()} </p>
                    {state.link && (
                        <p><Link href={state.link}>See page</Link></p>
                    )}
                </div>
            </Modal>
        );
    }
;

export default PopupAlert;
