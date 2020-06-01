import React, { useContext } from 'react';
import FormWizard from '../../components/Form/FormWizard';
import { useRouter } from 'next/router';
import AnnounceService from '../../services/AnnounceService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import Step0MotosManufacturer from '../../components/Vehicles/moto/Step0_MotosManufacturer';
import Step1MotoDetails from '../../components/Vehicles/moto/Step1_MotoDetails';
import Step2MotoStatus from '../../components/Vehicles/moto/Step2_MotoStatus';
import Step3MotoOwner from '../../components/Vehicles/moto/Step3_MotoOwner';

const MotorCyclesForm = (props) => {
    const router = useRouter();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);

    const onFinalSubmit = data => {
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                const link = `/announces/${doc.slug}`;
                dispatchModal({
                    type: 'success',
                    msg: 'Announce created successufully',
                    link,
                });
                router.push(link);
            }).catch(err => {
            dispatchModalError({ err });
        });
    };

    return (
        <FormWizard
            formKey={props.formKey}
            prevRoute="/deposer-une-annonce"
            // resumeModel={[]}
            onFinalSubmit={onFinalSubmit}>
            <Step0MotosManufacturer title="Sélection du véhicule"/>
            <Step1MotoDetails title="Description du véhicule"/>
            <Step2MotoStatus title="Etat du véhicule"/>
            <Step3MotoOwner title="Votre annonce"/>
        </FormWizard>
    );
};

MotorCyclesForm.getInitialProps = () => {
    return {
        requiredAuth: true,
        formKey: 'moto',
    };
};

export default MotorCyclesForm;
