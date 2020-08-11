import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import FormWizard from '../../components/Form/FormWizard';
import AnnounceService from '../../services/AnnounceService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import Step1CamperDetails from '../../components/Products/utility/Step1_UtiilityDetails';
import Step2UtilityStatus from '../../components/Products/utility/Step2_UtiliyStatus';
import Step3CarOwner from '../../components/Products/car/Step3_CarOwner';

const UtilityForm = (props) => {
    const router = useRouter();
    const { dispatchModal } = useContext(ModalDialogContext);
    const { t } = useTranslation();

    const onFinalSubmit = data => {
        AnnounceService.createAnnounce(data)
            .then(doc => {
                const link = `/announces/${doc.slug}`;
                dispatchModal({
                    type: 'success',
                    msg: 'Announce created successfully',
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

    const resumeModel = [
        {
            vehicleType: 'Type de véhicule'
        },
        {
            vin: 'Immat. VIN',
            'manufacturer.make': 'Marque',
            'manufacturer.model': 'Modele',
            'manufacturer.generation': 'Version',
            'manufacturer.year': 'Année'
        }
    ];

    return (
        <FormWizard
            formKey={props.formKey}
            prevRoute="/deposer-une-annonce"
            resumeModel={resumeModel}
            onFinalSubmit={onFinalSubmit}
        >
            <Step1CamperDetails title={t('vehicles:vehicle-description')}/>
            <Step2UtilityStatus title={t('vehicles:vehicle-state')}/>
            <Step3CarOwner title={t('vehicles:your-announce')}/>
        </FormWizard>
    );
};

UtilityForm.getInitialProps = () => {
    return {
        formKey: 'utility',
        requiredAuth: true
    };
};

export default UtilityForm;
