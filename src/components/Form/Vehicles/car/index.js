import React, { useContext } from "react";
import { useRouter} from "next/router";
import FormWizard from "../../FormWizard";
import AnnounceService from '../../../../services/AnnounceService';
import {ModalDialogContext} from "../../../Context/ModalDialogContext";
import Step0_CarManufacturer from "./Step0_CarManufacturer";
import Step1_CarDetails from "./Step1_CarDetails";
import Step2_CarStatus from "./Step2_CarStatus";
import Step3_CarOwner from "./Step3_CarOwner";

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
            <FormWizard id="demo1" classname="demo_form"
                        prevRoute="/deposer-une-annonce"
                        resumeModel={resumeModel}
                        onFinalSubmit={onFinalSubmit}>

                <Step0_CarManufacturer title="Sélection du véhicule"/>
                <Step1_CarDetails title="Description du véhicule"/>
                <Step2_CarStatus title="Etat du véhicule"/>
                <Step3_CarOwner title="Informations sur le vendeur"/>

            </FormWizard>
        </>
    );
};

// CarForm.getInitialProps = function() {
//     return {
//         requiredAuth : true,
//     };
// };

export default CarForm;
