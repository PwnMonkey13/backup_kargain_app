import React, {memo, useContext, useEffect, useCallback, useState, useMemo} from 'react'
import {FormContext} from '../../components/Context/FormContext';
import {useRouter} from "next/router";
import {Col, Row} from 'reactstrap';
import "react-step-progress-bar/styles.css";
import {ProgressBar} from "react-step-progress-bar";
import useIsMounted from "../../hooks/useIsMounted";
import useLocalStorage from "../../hooks/useLocalStorage";
import DebugLocalStorage from "../DebugLocalStorage";
import FormResume from "./FormResume";
import ControlledStep from '../ControlledStep';
import BreadcrumbSteps from "./BreadcrumbSteps";

const calculatePourcent = (current, length) => {
    return ((current + 1) / (length + 1)) * 100
};

const FormWizard = ({resumeModel, onFinalSubmit, children, prevRoute, ...props}) => {
    const router = useRouter();
    const isMounted = useIsMounted();
    const [steps, setSteps] = useState(Array.isArray(children) ? children.filter(child => child.props.hidden !== true) : [children]);
    const {formDataContext, dispatchFormUpdate} = useContext(FormContext);
    const [getFormData] = useLocalStorage('formData', {}, true);
    const [activeStep, setActiveStep] = useState(getFormData.currentStep || 0);
    const [maxActiveStep, setMaxActiveStep ]= useState(activeStep);
    const [pourcent, setPourcent] = useState(() => calculatePourcent(activeStep, steps.length));
    const [stepChanges, setStepChanges] = useState([]);

    const formConfig = {
        mode: 'onChange',
        validateCriteriaMode: "all",
        defaultValues: getFormData
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (isMounted) {
            setMaxActiveStep(maxStep => Math.max(maxStep, Number(activeStep)));
            dispatchFormUpdate({currentStep: activeStep});
            setPourcent(calculatePourcent(activeStep, steps.length));
        }
    }, [activeStep]);

    const handleSubmitForm = () => {
        const {currentStep, ...formData} = formDataContext;
        console.log("end form reached");
        onFinalSubmit(formData);
    };

    const collectStepChanges = useCallback(item => {
        setStepChanges(stepChanges => ({...stepChanges, [item.name] : item.label }))
    },[]);


    const setStep = useCallback((index) => {
        setActiveStep(index);
    },[]);

    const prevStep = useCallback(() => {
        setActiveStep(activeStep => activeStep - 1);
    },[]);

    const nextStep = useCallback(() => {
        setActiveStep(activeStep => activeStep + 1);
    },[]);

    const onSubmitStep = useCallback((data) => {
        dispatchFormUpdate(data);
        nextStep()
    },[]);

    console.log('render FormWizard');
    console.log(formDataContext);

    return (
        <main id={props.id} className={props.className}>
            <BreadcrumbSteps activeStepIndex={activeStep} steps={steps} setStep={setStep} maxActiveStep={maxActiveStep}/>
            <ProgressBar percent={pourcent} filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"/>
            <Row className="mx-auto px-2 my-4">
                <Col md={8} lg={9}>
                    <ControlledStep
                        step={steps[activeStep]}
                        collectStepChanges={collectStepChanges}
                        onSubmitStep={onSubmitStep}
                        prevStep={prevStep}
                        nextStep={nextStep}
                        formConfig={formConfig}
                        handleSubmitForm={handleSubmitForm}
                    />
                </Col>
                <Col md={4} lg={3}>
                    <FormResume resumeModel={resumeModel} formValues={{...formDataContext, ...stepChanges}}/>
                </Col>
            </Row>

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
