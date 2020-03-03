import React, { useContext } from "react";
import { useRouter} from "next/router";
import FormWizard from "../../FormWizard";
import AnnounceService from '../../../../services/AnnounceService';
import CarDetailsStep from "./CarDetailsStep";
import CarManufacturerStep from "./CarManufacturerStep";
import CarDetailsStep2 from "./CarDetailsStep2";
import CarStatusStep from "./CarStatusStep";
import {ModalDialogContext} from "../../../Context/ModalDialogContext";

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

    console.log('loaded');

    return (
        <FormWizard prevRoute="/deposer-une-annonce" onFinalSubmit={onFinalSubmit}>
            <CarManufacturerStep/>
            <CarDetailsStep/>
            <CarDetailsStep2/>
            <CarStatusStep/>
        </FormWizard>
    );
};

CarForm.getInitialProps = function() {
    return {
        requiredAuth : true,
    };
};

export default CarForm;
