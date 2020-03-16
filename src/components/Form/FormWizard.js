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

const calculatePourcent = (current, length) => {
    return ((current + 1) / (length + 1)) * 100
};

const FormWizard = ({onFinalSubmit, children, prevRoute}) => {
    const router = useRouter();
    const isMounted = useIsMounted();
    const [steps, setSteps] = useState(Array.isArray(children) ? children.filter(child => child.props.hidden !== true) : [children]);
    const {formDataContext, dispatchFormUpdate} = useContext(FormContext);
    const [getFormData] = useLocalStorage('formData', {}, true);
    const [activeStep, setActiveStep] = useState(getFormData.currentStep || 0);
    const [pourcent, setPourcent] = useState(() => calculatePourcent(activeStep, steps.length));
    const [parentValues, setParentValues] = useState([]);

    const formConfig = {
        mode: 'onChange',
        validateCriteriaMode: "all",
        defaultValues: getFormData
    };

    const handleSubmitForm = () => {
        const {currentStep, ...formData} = formDataContext;
        console.log("end form reached");
        onFinalSubmit(formData);
    };

    const onSubmitStep = useCallback((data) => {
        dispatchFormUpdate(data);
        nextStep()
    },[]);

    const getUpdates = useCallback((data) => setParentValues(parentValues => ({...parentValues, ...data})),[]);

    const prevStep = useCallback(() => {
        setActiveStep(activeStep => activeStep - 1);
    },[]);

    const nextStep = useCallback(() => {
        setActiveStep(activeStep => activeStep + 1);
    },[]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     if (isMounted) {
    //         dispatchFormUpdate({currentStep: activeStep});
    //         setPourcent(calculatePourcent(activeStep, steps.length));
    //         if (activeStep > steps.length - 1) {
    //             handleSubmitForm()
    //         }
    //     }
    // }, [activeStep]);

    console.log('render parent');
    return (
        <section>
            <ProgressBar percent={pourcent} filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"/>
            <Row className="mx-auto px-2 my-4">
                <Col md={8} lg={9}>
                    <ControlledStep
                        step={steps[activeStep]}
                        getUpdates={getUpdates}
                        onSubmitStep={onSubmitStep}
                        prevStep={prevStep}
                        nextStep={nextStep}
                        formConfig={formConfig}
                    />
                </Col>
                <Col md={4} lg={3}>
                    <FormResume/>
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
        </section>
    )
};

export default FormWizard;
