import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import FormPanel from "./Form/FormPanel";
import model from "./Form/Models/login.model";
import AuthService from '../services/AuthService';
import {UserContext} from "./Context/UserContext";
import {ModalDialogContext} from "./Context/ModalDialogContext";
import {useRouter} from "next/router";

export default (props) => {
    const router = useRouter();
    const {session, dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const [open, setOpen] = useState(!session.isLoggedIn);

    const handleSubmit = (e, data) => {
        AuthService.login(data.email, data.password)
            .then(data => {
                const { user } = data;
                dispatch({ type : 'loginSuccess', payload : data });
                dispatchModal({type : 'success', msg : `Welcome back ${user.firstname}` });
                router.push('/');
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
