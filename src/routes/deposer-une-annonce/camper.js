import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import FormWizard from '../../components/Form/FormWizard';
import AnnounceService from '../../services/AnnounceService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import Step0_DynVehicleManufacturer from '../../components/Products/Step0_DynVehicleManufacturer'
import Step1CamperDetails from '../../components/Products/camper/Step1_CamperDetails';
import Step2CamperStatus from '../../components/Products/camper/Step2_CamperStatus';
import Step3CarOwner from '../../components/Products/car/Step3_CarOwner';
import {vehicleTypes} from '../../business/vehicleTypes'

const CarForm = (props) => {
    const { dispatchModal } = useContext(ModalDialogContext);
    const router = useRouter();
    const { t } = useTranslation();

    const onFinalSubmit = data => {
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                const link = `/announces/${doc?.slug}`;

                dispatchModal({
                    msg: t('vehicles:announce_created_successfully'),
                    persist : true,
                    link
                });

                router.push(link);
            }).catch(err => {
                dispatchModal({
                    type: 'error',
                    err
                });
            });
    };

    return (
        <FormWizard
            formKey={props.formKey}
            prevRoute="/deposer-une-annonce"
            onFinalSubmit={onFinalSubmit}>

            <Step0_DynVehicleManufacturer
                vehicleType={vehicleTypes.camper}
                title={t('vehicles:vehicle-selection')}
            />
            <Step1CamperDetails title={t('vehicles:vehicle-description')}/>
            <Step2CamperStatus title={t('vehicles:vehicle-state')}/>
            <Step3CarOwner title={t('vehicles:your-announce')}/>
        </FormWizard>
    );
};

CarForm.getInitialProps = () => {
    return {
        formKey: 'camper',
        requiredAuth: true
    };
};

export default CarForm;
