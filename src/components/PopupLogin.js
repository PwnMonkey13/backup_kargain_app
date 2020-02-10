import React, { useContext } from "react";
import Popup from "reactjs-popup";
import { useRouter } from "next/router";
import FormPanel from "./form/FormPanel";
import model from "./form/Models/login.model";
import AuthService from '../services/AuthService';
import {UserContext} from "./Context/UserContext";
import {ModalDialogContext} from "./Context/ModalDialogContext";

const PopupLogin = ({open, onClose}) => {
    const router = useRouter();
    const { dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);

    const { redirect } = router.query;

    const handleSubmit = () => {
        const state = model.reduce((carry, m) => { return { ...carry, [m.name] : m.value }}, {});
        AuthService.login(state.email, state.password)
            .then(data => {
                dispatch({ type : 'loginSuccess', payload : data });
                dispatchModal({type : 'success', msg : 'connected' });
                onClose();
            }).catch(err => {
                dispatchModal({type : 'error', err });
                onClose();
            }
        );
    };

    return (
        <Popup open={open} closeOnDocumentClick onClose={onClose}>
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
