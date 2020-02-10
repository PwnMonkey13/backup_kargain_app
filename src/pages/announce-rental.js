import React, {useState, useContext} from "react";
import styled from 'styled-components';
import model from '../components/form/Models/announce-rental.model';
import FormPanel from '../components/form/FormPanel';
import {UserContext} from '../components/Context/UserContext';
import {ModalDialogContext} from "../components/Context/ModalDialogContext";
import AnnounceService from '../services/AnnounceService';
import PopupLogin from "../components/PopupLogin";

const Announce = (props) => {
    const {session, dispatch } = useContext(UserContext);
    const {dispatchModal} = useContext(ModalDialogContext);
    const [openModal, setOpenModal] = useState(!session.isLoggedIn);
    const [dataForm, setDataForm] = useState({});
    const [displayFormResume, setDisplayFormResume] = useState(false);

    const handleSubmit = async (e, data) => {
        setDataForm(data);
        // setDisplayFormResume(true);
        AnnounceService.createAnnounce(data, props.token)
            .then(data => {
                console.log(data);
                dispatchModal({type : 'success', msg : 'Announce created successufully' });
            }).catch(err => {
                dispatchModal({type : 'error', err });
            }
        );
    };

    const confirmSubmit = () => {};

    const closeModal = () => {
        setOpenModal(false);
    };

    const FormResume = () => {
        return(
            <table>
                { Object.entries(dataForm).map(([key, val]) => (
                    <tr>
                        <td>{key}</td>
                        <td>{val}</td>
                    </tr>
                ))}
            </table>
        )
    };

    return (
        <>
            <PopupLogin open={openModal} onClose={closeModal} />
            <FormPanel
                className="form_ad"
                btnName="Enregistrer"
                submitCallback={handleSubmit}
                model={model}
                value={dataForm}
            />
            { displayFormResume && <FormResume />}
        </>
    )
};

export default Announce;
