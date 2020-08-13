import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import Divider from '../../Divider';
import Header from '../../Header';
import useTranslation from 'next-translate/useTranslation';
import useIsMounted from '../../../hooks/useIsMounted';
import FieldWrapper from '../../Form/FieldWrapper';
import StepNavigation from '../../Form/StepNavigation';
import ToolTipWrapper from '../../Form/ToolTipWrapper';
import { SelectInput, TextInput } from '../../Form/Inputs';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import VehiclesService from '../../../services/VehiclesService';
import VinDecoderService from '../../../services/VinDecoderService'
import { FormContext } from '../../../context/FormContext';

const ColCenter = ({ children }) => (
    <Col className="d-flex flex-column align-items-center">
        {children}
    </Col>
);

const Step0CarManufacturer = ({ triggerSkipStep, onSubmitStep, prevStep, nextStep }) => {
    const formRef = useRef(null);
    const isMounted = useIsMounted();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const { formDataContext } = useContext(FormContext);
    const { t } = useTranslation();
    const { watch, control, errors, setValue, getValues, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext
    });

    const [vinDecoded, storeVinDecoded] = useState(null);
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
        generations: [],
        years: []
    });

    const internalSubmit = (data) => {
        const { make, model, year } = data;
        onSubmitStep({
            manufacturer : {
                make,
                model,
                year
            }
        })
    }

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
    };

    const isValidVIN = async (value) => {
        if (value) {
            const match = /[a-zA-Z0-9]{9}[a-zA-Z0-9-]{2}[0-9]{6}/.test(value);
            if (match) {
                try {
                    const result = await VinDecoderService.decodeVINFree(value);
                    storeVinDecoded(result);
                } catch (err) {
                    dispatchModal({
                        type: 'error',
                        err
                    });
                }
            } else {
                return 'INVALID VIN NUMBER';
            }
        }
    };

    useEffect(() => {
        if (isMounted && vinDecoded != null) {
            setValue('manufacturer', {
                make: {
                    label: vinDecoded.Make,
                    value: vinDecoded.Make
                }
            });
            setValue('manufacturer', {
                model: {
                    label: vinDecoded.Model,
                    value: vinDecoded.Model
                }
            });
            setValue('manufacturer', {
                year: {
                    label: vinDecoded.ModelYear,
                    value: vinDecoded.ModelYear
                }
            });
        }
    }, [isMounted, vinDecoded]);

    useEffect(() => {
        if (isMounted) {
            const values = getValues();
            const findDefault = Object.keys(values).find(key => values[key] && values[key].value === 'other');
            if (findDefault) nextStep();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues()]);

    useEffect(() => {
        if (isMounted &&
            watch('make') &&
            watch('model') &&
            watch('year')) {
            triggerSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('year')]);

    useEffect(() => {
        console.log('fetch makes');
        VehiclesService.getMakes("cars")
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
        if (watch('make') && vinDecoded == null) {
            const make = watch('make').label;
            console.log('fetch models');
            if(make){
                VehiclesService.getCarsDistinctModels(make)
                    .then(data => {
                        const { values } = data
                        if(!Array.isArray(values)) console.log('missing models array')

                        const modelsOptions = values.map(model => ({
                            value: model,
                            label: model
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
                            err,
                            persist: true
                        });
                    });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('make')]);

    useEffect(() => {
        if (watch('model') && vinDecoded == null) {
            const make = watch('make').label;
            const model = watch('model').label;
            if (make && model) {

                VehiclesService.getCarsMakeModelTrims(make, model)
                    .then(data => {
                        const { values } = data
                        if (!Array.isArray(values)) console.log('missing generations array')

                        const generationsOptions = values.map(trim => ({
                            value: trim,
                            label: trim
                        }));

                        const defaultOption = {
                            value: 'other',
                            label: 'Je ne sais pas/Autre'
                        };
                        setManufacturersData(manufacturersData => (
                            {
                                ...manufacturersData,
                                generations: [...generationsOptions, defaultOption]
                            })
                        );
                    })
                    .catch(err => {
                        dispatchModalError({ err });
                    });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('model')]);

    useEffect(() => {
        if (watch('generation') && vinDecoded == null) {
            const make = watch('make').value;
            const model = watch('model').value;
            const trim = watch('generation').value;

            if(make && model && trim) {
                VehiclesService.getCarsMakeModelTrimYears(make, model, trim)
                    .then(results => {
                        console.log(results)
                        if (!Array.isArray(results)) console.log('missing years array')

                        const yearsOptions = results.map(result => ({
                            value: result._id,
                            label: result.year
                        }));
                        setManufacturersData(manufacturersData => (
                            {
                                ...manufacturersData,
                                years: yearsOptions
                            })
                        );
                    })
                    .catch(err => {
                        dispatchModalError({ err });
                    });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('generation')]);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(internalSubmit)}>
            <Row>
                <ColCenter>
                    <FieldWrapper label={t('vehicles:vin-type-number-car')} tooltip={
                        <ToolTipWrapper
                            icon="?"
                            template="default">
                            <p> {t('vehicles:vin-helper')} </p>
                        </ToolTipWrapper>
                    }>
                        <TextInput
                            name="vin"
                            placeholder="Ex: 1C4RJFBG4FC812166"
                            errors={errors}
                            control={control}
                            rules={{
                                validate: {
                                    isValidVIN: value => isValidVIN(value)
                                }
                            }}
                        />
                    </FieldWrapper>
                </ColCenter>
            </Row>

            <Divider text={t('vehicles:or')}/>
            <Header text={t('vehicles:select-your-car')}/>

            <Row>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:make')} labelTop>
                        <SelectInput
                            name="make"
                            placeholder={t('vehicles:select-vehicle-make')}
                            control={control}
                            errors={errors}
                            options={manufacturersData.makes}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:model')} labelTop>
                        <SelectInput
                            name="model"
                            placeholder={t('vehicles:select-vehicle-model')}
                            options={manufacturersData.models}
                            control={control}
                            errors={errors}
                            disabled={!watch('make')}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label="Version" labelTop>
                        <SelectInput
                            name="generation"
                            placeholder={t('vehicles:select-vehicle-generation')}
                            options={manufacturersData.generations}
                            control={control}
                            errors={errors}
                            disabled={!watch('model')}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:year')} labelTop>
                        <SelectInput
                            name="year"
                            placeholder="Select year"
                            options={manufacturersData.years}
                            control={control}
                            errors={errors}
                            disabled={!watch('generation')}
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            <button className="btn" onClick={triggerSkipStep}>{t('vehicles:skip-step')}</button>
            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};

export default Step0CarManufacturer
