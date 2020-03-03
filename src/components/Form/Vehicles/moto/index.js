import React from "react";
import {FormContextProvider} from '../../../Context/FormContext'
import FormWizard from "../../FormWizard";
import MotoDetailsStep from "./MotoDetailsStep";
import MotosSelector from "./MotosSelector";

export default () => {
    return (
        <FormContextProvider>
            <FormWizard>
                <MotosSelector/>
                <MotoDetailsStep/>
            </FormWizard>
        </FormContextProvider>
    );
};
