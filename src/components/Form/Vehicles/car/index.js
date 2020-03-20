import React, { useContext } from "react";
import { useRouter} from "next/router";
import FormWizard from "../../FormWizard";
import AnnounceService from '../../../../services/AnnounceService';
import {ModalDialogContext} from "../../../Context/ModalDialogContext";
import Step0_CarManufacturer from "./Step0_CarManufacturer";
import Step1_CarDetails from "./Step1_CarDetails";
import Step2_CarDetails from "./Step2_CarDetails";
import Step3_CarStatus from "./Step3_CarStatus";
import Header from "../../../Header";

const CarForm = (props) => {
    const {dispatchModal} = useContext(ModalDialogContext);
    const router = useRouter();

    const onFinalSubmit = data => {
        console.log("save announce");
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                console.log(doc);
                const link = `/announces/${doc.slug}`;
                dispatchModal({type : 'success', msg : 'Announce created successufully', link });
                router.push(link);
            }).catch(err => {
                dispatchModal({type : 'error', err });
            }
        );
    };

    const resumeModel = [
        {
            "vehicleType" : 'Type de véhicule'
        },
        {
            "vin" : "Immat. VIN",
            "manufacturer.make" : "Marque",
            "manufacturer.model" : "Modele",
            "manufacturer.generation" : "Version",
            "manufacturer.year" : "Année",
        }
    ];

    return (
        <>
            <Header as="h2" className="big-mt text-center">
                Vendez votre voiture
            </Header>
            <FormWizard id="demo1" classname="demo_form"
                        prevRoute="/deposer-une-annonce"
                        resumeModel={resumeModel}
                        onFinalSubmit={onFinalSubmit}>

                <Step0_CarManufacturer title="Sélection du véhicule"/>
                <Step1_CarDetails title="Description du véhicule"/>
                <Step2_CarDetails title="Description du véhicule (suite)" nobreadcrumb/>
                <Step3_CarStatus title="Etat du véhicule"/>

            </FormWizard>
        </>
    );
};

CarForm.getInitialProps = function() {
    return {
        requiredAuth : true,
    };
};

export default CarForm;
