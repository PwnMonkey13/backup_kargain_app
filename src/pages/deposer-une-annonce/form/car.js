import React, {useContext} from "react";
import {useRouter} from "next/router";
import FormWizard from "../../../components/Form/FormWizard";
import AnnounceService from '../../../services/AnnounceService';
import {ModalDialogContext} from "../../../components/Context/ModalDialogContext";
import Step0_CarManufacturer from "../../../components/Vehicles/car/Step0_CarManufacturer";
import Step1_CarDetails from "../../../components/Vehicles/car/Step1_CarDetails";
import Step2_CarStatus from "../../../components/Vehicles/car/Step2_CarStatus";
import Step3_CarOwner from "../../../components/Vehicles/car/Step3_CarOwner";

const CarForm = (props) => {
    const {dispatchModal} = useContext(ModalDialogContext);
    const router = useRouter();

    const onFinalSubmit = data => {
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                const link = `/announces/${doc.slug}`;
                dispatchModal({type: 'success', msg: 'Announce created successufully', link});
                router.push(link);
            }).catch(err => {
                dispatchModal({type: 'error', err});
            }
        );
    };

    const resumeModel = [
        {
            "vehicleType": 'Type de véhicule'
        },
        {
            "vin": "Immat. VIN",
            "manufacturer.make": "Marque",
            "manufacturer.model": "Modele",
            "manufacturer.generation": "Version",
            "manufacturer.year": "Année",
        }
    ];

    return (
        <FormWizard
            formKey="car"
            classname="cars_form"
            prevRoute="/deposer-une-annonce"
            resumeModel={resumeModel}
            onFinalSubmit={onFinalSubmit}
        >
            <Step0_CarManufacturer title="Sélection du véhicule"/>
            <Step1_CarDetails title="Description du véhicule"/>
            <Step2_CarStatus title="Etat du véhicule"/>
            <Step3_CarOwner title="Informations sur le vendeur"/>
        </FormWizard>
    );
};

CarForm.getInitialProps = () => {
    return {
        formKey : "car"
    }
};

export default CarForm;
