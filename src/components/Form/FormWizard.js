import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { ProgressBar } from 'react-step-progress-bar';
import FormResume from './FormResume';
import ControlledStep from './ControlledStep';
import BreadcrumbSteps from './BreadcrumbSteps';
import useIsMounted from '../../hooks/useIsMounted';
import DebugLocalStorage from '../DebugLocalStorage';
import { FormContext } from '../../context/FormContext';

const calculatePourcent = (current, length) => {
    return ((current + 1) / (length + 1)) * 100;
};

const FormWizard = ({ debug, formKey, resumeModel, onFinalSubmit, children, prevRoute, ...props }) => {
    const isMounted = useIsMounted();
    const steps = Array.isArray(children) ? children.filter(child => child.props.hidden !== true) : children ? [children] : [];
    const { formDataContext, dispatchFormUpdate } = useContext(FormContext);
    const [activeStep, setActiveStep] = useState(formDataContext.currentStep || 0);
    const [maxActiveStep, setMaxActiveStep] = useState(steps.length);
    const [pourcent, setPourcent] = useState(() => calculatePourcent(activeStep, steps.length));
    const [stepChanges, setStepChanges] = useState([]);
    const [endForm, setEndForm] = useState(false);

    useEffect(()=>{
        dispatchFormUpdate({
            vehicleType : formKey.toLowerCase()
        });
    },[])

    useEffect(() => {
        window.scrollTo(0, 0);
        if (isMounted) {
            setMaxActiveStep(maxStep => Math.max(maxStep, Number(activeStep)));
            dispatchFormUpdate({ currentStep: activeStep });
            setPourcent(calculatePourcent(activeStep, steps.length));
        }
    }, [activeStep]);

    useEffect(() => {
        if (isMounted && endForm) {
            const { currentStep, ...formData } = formDataContext;
            console.log('end form reached');
            onFinalSubmit(formData);
            setEndForm(false);
        }
    }, [endForm]);

    const collectStepChanges = useCallback(item => {
        setStepChanges(stepChanges => ({
            ...stepChanges,
            [item.name]: item.label,
        }));
    }, []);

    const setStep = useCallback((index) => {
        setActiveStep(index);
    }, []);

    const prevStep = useCallback(() => {
        setActiveStep(activeStep => activeStep - 1);
    }, []);

    const nextStep = useCallback(() => {
        setActiveStep(activeStep => activeStep + 1);
    }, []);

    const triggerDispatchFormData = (data) => {
        dispatchFormUpdate(data);
    };

    const onSubmitStep = useCallback((data, event) => {
        triggerDispatchFormData(data);
        nextStep();
    }, []);

    const handleSubmitForm = (data, event) => {
        triggerDispatchFormData(data);
        setEndForm(true);
    };

    console.log('render form wizard');

    return (
        <div className="formWizardContainer">
            <BreadcrumbSteps activeStepIndex={activeStep}
                             steps={steps}
                             setStep={setStep}
                             maxActiveStep={maxActiveStep}
            />
            <ProgressBar percent={pourcent} filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"/>
            {props.enableResume ? (
                <Row className="mx-auto px-2 my-4">
                    <Col md={8} lg={9}>
                        <ControlledStep
                            step={steps[activeStep]}
                            collectStepChanges={collectStepChanges}
                            onSubmitStep={onSubmitStep}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            handleSubmitForm={handleSubmitForm}
                        />
                    </Col>
                    <Col md={4} lg={3}>
                        <FormResume
                            resumeModel={resumeModel}
                            formValues={{ ...formDataContext, ...stepChanges }}
                        />
                    </Col>
                </Row>
            ) : (
                <ControlledStep
                    step={steps[activeStep]}
                    collectStepChanges={collectStepChanges}
                    onSubmitStep={onSubmitStep}
                    prevStep={prevStep}
                    nextStep={nextStep}
                    handleSubmitForm={handleSubmitForm}
                />
            )}

            {debug && (
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
            )}

        </div>
    );
};

FormWizard.propTypes = {
    formKey: PropTypes.string.isRequired,
    debug: PropTypes.bool,
    enableResume: PropTypes.bool,
};

FormWizard.defaultProps = {
    formKey: '',
    debug: false,
    enableResume: false,
};

export default FormWizard;
