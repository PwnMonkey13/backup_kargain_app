import React, {useContext} from "react";
import FormWizard from "../../FormWizard";
import {useRouter} from "next/router";
import Step0_MotosSelector from "./Step0_MotosSelector";
import Step1_MotoDetails from "./Step1_MotoDetails";
import Step2_CarStatus from "../car/Step2_CarStatus";
import Step3_CarOwner from "../car/Step3_CarOwner";
import AnnounceService from "../../../../services/AnnounceService";
import {ModalDialogContext} from "../../../Context/ModalDialogContext";

const MotorCyclesForm = (props) => {
    const {dispatchModal} = useContext(ModalDialogContext);
    const resumeModel = [];
    const router = useRouter();

    const onFinalSubmit = data => {
        console.log("save announce");
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                console.log(doc);
                const link = `/announces/${doc.slug}`;
                dispatchModal({type: 'success', msg: 'Announce created successufully', link});
                router.push(link);
            }).catch(err => {
                dispatchModal({type: 'error', err});
            }
        );
    };

    return (
        <FormWizard classname="motorcycles_form"
                    prevRoute="/deposer-une-annonce"
                    resumeModel={resumeModel}
                    onFinalSubmit={onFinalSubmit}>
            <Step0_MotosSelector title="Sélection du véhicule"/>
            <Step1_MotoDetails title="Description du véhicule"/>
            <Step2_CarStatus title="Etat du véhicule"/>
            <Step3_CarOwner title="Informations sur le vendeur"/>
        </FormWizard>
    );
};

export default MotorCyclesForm;
