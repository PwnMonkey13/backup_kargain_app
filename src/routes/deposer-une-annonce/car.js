import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import FormWizard from '../../components/Form/FormWizard';
import AnnounceService from '../../services/AnnounceService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import Step0CarManufacturer from '../../components/Products/car/Step0_CarManufacturer';
import Step1CarDetails from '../../components/Products/car/Step1_CarDetails';
import Step2CarStatus from '../../components/Products/car/Step2_CarStatus';
import Step3CarOwner from '../../components/Products/car/Step3_CarOwner';

const CarForm = (props) => {
    const router = useRouter();
    const { t } = useTranslation();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);

    const onFinalSubmit = form => {
        const { images, ...body } = form;
        let formData = new FormData();

        if (images && Array.isArray(images)) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
        startPost(body, formData, images);
    };

    const startPost = async (body, formData, images) => {
        dispatchModal({ msg: 'Creating...' });
        try {
            const announce = await AnnounceService.createAnnounce(body);
            const link = `/announces/${announce.slug}`;

            if (announce && images) {
                await AnnounceService.uploadImages(announce.slug, formData);
            }

            dispatchModal({
                type: 'success',
                msg: 'Announce created successfully'
            });

            router.push(link);

        } catch (err) {
            dispatchModalError({
                err,
                persist : true
            });
        }
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
            // enableResume={true}
            onFinalSubmit={onFinalSubmit}>
            <Step0CarManufacturer title={t('vehicles:vehicle-selection')}/>
            <Step1CarDetails title={t('vehicles:vehicle-description')}/>
            <Step2CarStatus title={t('vehicles:vehicle-state')}/>
            <Step3CarOwner title={t('vehicles:your-announce')}/>
        </FormWizard>
    );
};

CarForm.getInitialProps = () => {
    return {
        requiredAuth: true,
        formKey: 'car'
    };
};

export default CarForm;
