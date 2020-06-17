import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import FormWizard from '../../components/Form/FormWizard';
import AnnounceService from '../../services/AnnounceService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import Step0CarManufacturer from '../../components/Vehicles/car/Step0_CarManufacturer';
import Step1CarDetails from '../../components/Vehicles/car/Step1_CarDetails';
import Step2CarStatus from '../../components/Vehicles/car/Step2_CarStatus';
import Step3CarOwner from '../../components/Vehicles/car/Step3_CarOwner';

const CarForm = (props) => {
    const router = useRouter();
    const { t, lang } = useTranslation();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);

    const onFinalSubmit = form => {
        const { featured_image : featuredImage, images, ...body } = form;

        let formData = new FormData();

        if(images && Array.isArray(images)){
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        startPost(body, formData);

    };

    const startPost = async (body, formData) => {
        dispatchModal({ msg: 'Creating...' });
        try{
            const announce = await AnnounceService.createAnnounce(body)
            const docUploaded = await AnnounceService.uploadImages(announce.slug, formData)
            const link = `/announces/${docUploaded.slug}`;
            router.push(link);
            dispatchModal({
                type: 'success',
                msg: 'Announce created successufully',
            });
        }catch (err) {
            dispatchModalError({ err });
        }
    };

    const resumeModel = [
        {
            vehicleType: 'Type de véhicule',
        },
        {
            vin: 'Immat. VIN',
            'manufacturer.make': 'Marque',
            'manufacturer.model': 'Modele',
            'manufacturer.generation': 'Version',
            'manufacturer.year': 'Année',
        },
    ];

    console.log('render car form');

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
        formKey: 'car',
    };
};

export default CarForm;
