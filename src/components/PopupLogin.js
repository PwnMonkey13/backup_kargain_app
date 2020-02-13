import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import FormPanel from "./form/FormPanel";
import model from "./form/Models/login.model";
import AuthService from '../services/AuthService';
import {UserContext} from "./Context/UserContext";
import {ModalDialogContext} from "./Context/ModalDialogContext";

const PopupLogin = () => {
    const {session, dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const [open, setOpen] = useState(!session.isLoggedIn);

    const handleSubmit = (e, data) => {
        AuthService.login(data.email, data.password)
            .then(data => {
                dispatch({ type : 'loginSuccess', payload : data });
                dispatchModal({type : 'success', msg : 'connected' });
                close();
            }).catch(err => {
                dispatchModal({type : 'error', err });
                close();
            }
        );
    };

    const close = () => {
        setOpen(false);
    };

    return(
        <Popup open={open} closeOnDocumentClick onClose={close}>
            <div className="auth_form m-auto">
                <h1>Se connecter</h1>
                <FormPanel
                    btnName="Connection"
                    submitCallback={handleSubmit}
                    model={model}
                />
            </div>
        </Popup>
    )
};

export default PopupLogin;
