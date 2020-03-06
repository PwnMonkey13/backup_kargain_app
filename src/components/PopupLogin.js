import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import AuthService from '../services/AuthService';
import {UserContext} from "./Context/UserContext";
import {ModalDialogContext} from "./Context/ModalDialogContext";
import {useRouter} from "next/router";
import {EmailInput, PasswordInput} from "./Form/Inputs";
import {useForm} from "react-hook-form";

const formConfig = {
    mode: 'onChange',
    reValidateMode: 'onChange',
    validateCriteriaMode: "all",
};


export default (props) => {
    const router = useRouter();
    const {control, errors, setValue, getValues, formState, watch, register, handleSubmit} = useForm(formConfig);

    const {session, dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const [open, setOpen] = useState(!session.isLoggedIn);

    const onSubmit = (e, data) => {
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="fields">
                        <EmailInput
                            label="Email"
                            name="email"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <PasswordInput
                            label="Mot de passe"
                            name="password"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                    </div>
                    <div className="submit">
                        <button className="btn btn-outline-primary" type="submit">Se connecter</button>
                    </div>
                </form>
            </div>
        </Popup>
    )
};
