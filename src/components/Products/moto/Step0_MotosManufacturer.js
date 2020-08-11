import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import Header from '../../Header';
import FieldWrapper from '../../Form/FieldWrapper';
import StepNavigation from '../../Form/StepNavigation';
import { SelectInput } from '../../Form/Inputs';
import useIsMounted from '../../../hooks/useIsMounted';
import { FormContext } from '../../../context/FormContext';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import VehiclesService from '../../../services/VehiclesService';

const Step0_MotosManufacturer = ({ collectStepChanges, triggerSkipStep, onSubmitStep, prevStep, nextStep }) => {
    const formRef = useRef(null);
    const isMounted = useIsMounted();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { formDataContext } = useContext(FormContext);
    const { watch, control, errors, getValues, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext
    });

    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: []
    });

    const triggerSubmit = () => {
        console.log('triggerSubmitStep');
        formRef.current.dispatchEvent(new Event('submit'));
    };

    useEffect(() => {
        if (isMounted) {
            const values = getValues();
            const findDefault = Object.keys(values).find(key => values[key] && values[key].value === 'other');
            if (findDefault) nextStep();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues(), isMounted]);

    useEffect(() => {
        if (isMounted && watch('manufacturer.make') && watch('manufacturer.model')) {
            triggerSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('manufacturer.model')]);

    useEffect(() => {
        console.log('fetch makes');
        VehiclesService.getMakes("motorcycles")
            .then(motos => {
                const makesOptions = motos.map(car => ({
                    value: car.make,
                    label: car.make
                }));
                const defaultOption = {
                    value: 'other',
                    label: 'Je ne sais pas/Autre'
                };
                setManufacturersData(manufacturersData => (
                    {
                        ...manufacturersData,
                        makes: [...makesOptions, defaultOption]
                    })
                );
            })
            .catch(err => {
                dispatchModalError({ err });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (watch('manufacturer.make')) {
            console.log('fetch 2');
            const makeID = watch('manufacturer.make').value;
            if (makeID) {
                VehiclesService.getMakeModels("motorcycles", makeID)
                    .then(data => data.models)
                    .then(models => {
                        const modelsOptions = models.map(model => ({
                            value: model.model,
                            label: model.model
                        }));
                        const defaultOption = {
                            value: 'other',
                            label: 'Je ne sais pas/Autre'
                        };
                        setManufacturersData(manufacturersData => (
                            {
                                ...manufacturersData,
                                models: [...modelsOptions, defaultOption]
                            })
                        );
                    })
                    .catch(err => {
                        dispatchModalError({
                            err
                        });
                    });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('manufacturer.make')]);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Header text="Sélectionnez votre moto"/>
            <Row>
                <Col>
                    <FieldWrapper label="Marque" labelTop>
                        <SelectInput
                            name="manufacturer.make"
                            placeholder="Select a motorcycle make"
                            control={control}
                            errors={errors}
                            options={manufacturersData.makes}
                            onChange={([selected, name]) => {
                                collectStepChanges({
                                    name: name,
                                    label: selected.label
                                });
                                return selected;
                            }}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Modele" labelTop>
                        <SelectInput
                            name="manufacturer.model"
                            placeholder="Select a motorcycle model"
                            options={manufacturersData.models}
                            control={control}
                            errors={errors}
                            onChange={([selected, option]) => {
                                collectStepChanges({
                                    name: option.name,
                                    label: selected.label
                                });
                                return selected;
                            }}
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            <button className="btn" onClick={triggerSkipStep}>Passer cette étape</button>
            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};
export default Step0_MotosManufacturer;
