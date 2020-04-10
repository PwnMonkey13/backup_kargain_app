import React, {useContext} from "react";
import FormWizard from "../../components/Form/FormWizard";
import {useRouter} from "next/router";
import AnnounceService from "../../services/AnnounceService";
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";
import Step0_MotosSelector from "../../components/Vehicles/moto/Step0_MotosSelector";
import Step1_MotoDetails from "../../components/Vehicles/moto/Step1_MotoDetails";
import Step2_MotoStatus from "../../components/Vehicles/moto/Step2_MotoStatus";
import Step3_MotoOwner from "../../components/Vehicles/moto/Step3_MotoOwner";

const MotorCyclesForm = (props) => {
    const {dispatchModal, dispatchModalError} = useContext(ModalDialogContext);
    const resumeModel = [];
    const router = useRouter();

    const onFinalSubmit = data => {
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                const link = `/announces/${doc.slug}`;
                dispatchModal({type: 'success', msg: 'Announce created successufully', link});
                router.push(link);
            }).catch(err => {
            dispatchModalError({err});
            }
        );
    };

    return (
        <FormWizard
            formKey={props.formKey}
            prevRoute="/deposer-une-annonce"
            resumeModel={resumeModel}
            onFinalSubmit={onFinalSubmit}>
            <Step0_MotosSelector title="Sélection du véhicule"/>
            <Step1_MotoDetails title="Description du véhicule"/>
            <Step2_MotoStatus title="Etat du véhicule"/>
            <Step3_MotoOwner title="Votre annonce"/>
        </FormWizard>
    );
};

MotorCyclesForm.getInitialProps = () => {
    return {
        formKey : "moto"
    }
};

export default MotorCyclesForm;
