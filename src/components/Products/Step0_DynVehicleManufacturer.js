import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import FieldWrapper from '../Form/FieldWrapper';
import StepNavigation from '../Form/StepNavigation';
import { SelectInput } from '../Form/Inputs';
import useIsMounted from '../../hooks/useIsMounted';
import { FormContext } from '../../context/FormContext';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import VehiclesService from '../../services/VehiclesService';

const Step0_DynVehicleManufacturer = ({vehicleTypeModel, triggerSkipStep, onSubmitStep, prevStep, nextStep }) => {
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
        if (isMounted &&
          watch('manufacturer.make') &&
          watch('manufacturer.model')) {
            triggerSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('manufacturer.model')]);

    useEffect(() => {
        console.log('fetch makes');
        VehiclesService.getMakes(vehicleTypeModel)
            .then(makes => {
                const makesOptions = makes.map(make => ({
                    value: make._id,
                    label: make.make
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
            const make = watch('manufacturer.make').label;
            console.log('fetch models');

            if (make) {
                VehiclesService.getMakeModels(vehicleTypeModel, make)
                    .then(models => {
                        const modelsOptions = models.map(model => ({
                            value: model._id,
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
            <Row>
                <Col>
                    <FieldWrapper label="Marque" labelTop>
                        <SelectInput
                            name="manufacturer.make"
                            placeholder="Select a vehicle make"
                            control={control}
                            errors={errors}
                            options={manufacturersData.makes}
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
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            <button className="btn" onClick={triggerSkipStep}>Passer cette étape</button>
            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};

Step0_DynVehicleManufacturer.propTypes = {
    vehicleTypeModel : PropTypes.string.isRequired
}

export default Step0_DynVehicleManufacturer;
