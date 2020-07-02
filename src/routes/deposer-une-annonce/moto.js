import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import FormWizard from '../../components/Form/FormWizard';
import AnnounceService from '../../services/AnnounceService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import Step0MotosManufacturer from '../../components/Vehicles/moto/Step0_MotosManufacturer';
import Step1MotoDetails from '../../components/Vehicles/moto/Step1_MotoDetails';
import Step2MotoStatus from '../../components/Vehicles/moto/Step2_MotoStatus';
import Step3MotoOwner from '../../components/Vehicles/moto/Step3_MotoOwner';

const MotorCyclesForm = (props) => {
    const router = useRouter();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const { t } = useTranslation();

    const onFinalSubmit = data => {
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                const link = `/announces/${doc.slug}`;
                dispatchModal({
                    type: 'success',
                    msg: 'Announce created successfully',
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
            <Step0MotosManufacturer title={t('vehicles:vehicle-selection')}/>
            <Step1MotoDetails title={t('vehicles:vehicle-description')}/>
            <Step2MotoStatus title={t('vehicles:vehicle-state')}/>
            <Step3MotoOwner title={t('vehicles:your-announce')}/>
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
