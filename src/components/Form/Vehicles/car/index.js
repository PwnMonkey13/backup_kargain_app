import React, { useContext } from "react";
import { useRouter} from "next/router";
import FormWizard from "../../FormWizard";
import AnnounceService from '../../../../services/AnnounceService';
import {ModalDialogContext} from "../../../Context/ModalDialogContext";
import Step0_CarManufacturer from "./Step0_CarManufacturer";
import Step1_CarDetails from "./Step1_CarDetails";
import Step2_CarDetails from "./Step2_CarDetails";
import Step3_CarStatus from "./Step3_CarStatus";

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

    return (
        <>
            <FormWizard prevRoute="/deposer-une-annonce" onFinalSubmit={onFinalSubmit}>
                <Step0_CarManufacturer/>
                <Step1_CarDetails/>
                <Step2_CarDetails/>
                <Step3_CarStatus/>
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
