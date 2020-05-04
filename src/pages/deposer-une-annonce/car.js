import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import FormWizard from '../../components/Form/FormWizard';
import AnnounceService from '../../services/AnnounceService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import Step0CarManufacturer from '../../components/Vehicles/car/Step0_CarManufacturer';
import Step1CarDetails from '../../components/Vehicles/car/Step1_CarDetails';
import Step2CarStatus from '../../components/Vehicles/car/Step2_CarStatus';
import Step3CarOwner from '../../components/Vehicles/car/Step3_CarOwner';

const CarForm = (props) => {
    const router = useRouter();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);

    const onFinalSubmit = form => {
        const { featuredImg, images, ...body } = form;
        if (body.location && body.location.value) body.location = body.location.value;

        let formData = new FormData();

        if (form['featured_image']) {
            formData.append('featured_image', form['featured_image']);
        }

        for (let i = 0; i < form['images'].length; i++) {
            formData.append('images', form['images'][i]);
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

    return (
        <FormWizard
            formKey={props.formKey}
            prevRoute="/deposer-une-annonce"
            resumeModel={resumeModel}
            // enableResume={true}
            onFinalSubmit={onFinalSubmit}>
            <Step0CarManufacturer title="Sélection du véhicule"/>
            <Step1CarDetails title="Description du véhicule"/>
            <Step2CarStatus title="Etat du véhicule"/>
            <Step3CarOwner title="Votre annonce"/>
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
