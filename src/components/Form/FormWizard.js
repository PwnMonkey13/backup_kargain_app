import React, {useRef, useState, useEffect, useContext} from 'react'
import {FormContext} from '../../components/Context/FormContext';
import { useRouter} from "next/router";
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import useIsMounted from "../../hooks/useIsMounted";
import useLocalStorage from "../../hooks/useLocalStorage";
import DebugLocalStorage from "../DebugLocalStorage";

const FormWizard = ({onFinalSubmit, children, prevRoute}) => {
    const router = useRouter();
    const [steps, setSteps] = useState(Array.isArray(children) ? children.filter(child => child.props.hidden !== true) : [children]);
    const {formDataContext, dispatchFormUpdate} = useContext(FormContext);
    const [ getFormData ] = useLocalStorage('formData', {}, true);
    const [activeStep, setActiveStep] = useState(getFormData.currentStep || 0);
    const [ pourcent, setPourcent ] = useState(0);

    console.log(getFormData.currentStep);

    const formConfig = {
        mode: 'onChange',
        reValidateMode: 'onChange',
        validateCriteriaMode: "all",
        defaultValues : getFormData
    };

    const handleSubmitForm = () => {
        const { currentStep, ...formData } = formDataContext;
        console.log("end form reached");
        onFinalSubmit(formData);
    };

    const onSubmitStep = (data) => {
        dispatchFormUpdate(data);
        nextStep()
    };

    const prevStep = () => {
        setActiveStep(activeStep => activeStep - 1);
    };

    const nextStep = () => {
        setActiveStep(activeStep => activeStep + 1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setPourcent(((activeStep + 1) / (steps.length + 1) ) * 100);
        dispatchFormUpdate({currentStep : activeStep});
        if(activeStep > steps.length - 1){
            handleSubmitForm()
        }
    }, [activeStep]);

    const ControlledStep = () => {
        if(steps[activeStep]){
            return React.cloneElement(steps[activeStep], {
                onSubmitStep,
                prevStep,
                nextStep,
                formConfig,
                ...steps[activeStep].props
            }, []);
        }
        else return(
            <p> loading </p>
        );
    };

    console.log(activeStep);

    return (
        <main>
            <ProgressBar
                percent={pourcent}
                filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
            />
            <ControlledStep/>
            <Row>
                <Col>
                    <div>
                        <h2> formContext </h2>
                        <pre>{JSON.stringify(formDataContext, null, 2)}</pre>
                    </div>
                </Col>
                <Col>
                    <DebugLocalStorage value="formData"/>
                </Col>
            </Row>
        </main>
    )
};

export default FormWizard;
