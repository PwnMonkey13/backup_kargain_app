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
import VinDecoderService from '../../../services/VinDecoderService';
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
            watch('manufacturer.make') &&
            watch('manufacturer.model') &&
            watch('manufacturer.year')) {
            triggerSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('manufacturer.year')]);

    useEffect(() => {
        console.log('fetch makes');
        VehiclesService.getMakes("cars")
            .then(cars => {
                console.log(cars)
                const makesOptions = cars.map(car => ({
                    value: Number(car.make_id),
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

    // useEffect(() => {
    //     if (watch('manufacturer.make') && vinDecoded == null) {
    //         const makeID = watch('manufacturer.make').value;
    //         console.log('fetch models');
    //         if (!isNaN(makeID)) {
    //             VehiclesService.getMakeModels("cars", makeID)
    //                 .then(data => {
    //                     const { make, models } = data
    //                     console.log(data)
    //                     const modelsOptions = models.map(model => ({
    //                         value: model.model_id,
    //                         label: model.model
    //                     }));
    //                     const defaultOption = {
    //                         value: 'other',
    //                         label: 'Je ne sais pas/Autre'
    //                     };
    //                     setManufacturersData(manufacturersData => (
    //                         {
    //                             ...manufacturersData,
    //                             models: [...modelsOptions, defaultOption]
    //                         })
    //                     );
    //                 })
    //                 .catch(err => {
    //                     console.log(err)
    //                     dispatchModalError({
    //                         err,
    //                         persist: true
    //                     });
    //                 });
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [watch('manufacturer.make')]);

    // useEffect(() => {
    //     if (watch('manufacturer.model') && vinDecoded == null) {
    //         const makeID = watch('manufacturer.make').value;
    //         const modelID = watch('manufacturer.model').value;
    //
    //         if (!isNaN(makeID) && !isNaN(modelID)) {
    //             VehiclesService.getVehiclesGenerations(makeID, modelID)
    //                 .then(generations => {
    //                     const generationsOptions = generations.map(
    //                         // eslint-disable-next-line camelcase
    //                         ({ generation_id, generation }) => ({
    //                             value: generation_id,
    //                             label: generation
    //                         })
    //                     );
    //                     const defaultOption = {
    //                         value: 'other',
    //                         label: 'Je ne sais pas/Autre'
    //                     };
    //                     setManufacturersData(manufacturersData => (
    //                         {
    //                             ...manufacturersData,
    //                             generations: [...generationsOptions, defaultOption]
    //                         })
    //                     );
    //                 })
    //                 .catch(err => {
    //                     dispatchModalError({ err });
    //                 });
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [watch('manufacturer.model')]);

    // useEffect(() => {
    //     if (watch('manufacturer.generation') && vinDecoded == null) {
    //         const makeID = watch('manufacturer.make').value;
    //         const modelID = watch('manufacturer.model').value;
    //         const generationID = watch('manufacturer.generation').value;
    //
    //         if (!isNaN(makeID) && !isNaN(modelID) && !isNaN(generationID)) {
    //             VehiclesService.getVehiclesYearsVersion(makeID, modelID, generationID)
    //                 .then(years => {
    //                     const yearsOptions = years.map(year => ({
    //                         value: year.year,
    //                         label: year.year
    //                     }));
    //                     setManufacturersData(manufacturersData => (
    //                         {
    //                             ...manufacturersData,
    //                             years: yearsOptions
    //                         })
    //                     );
    //                 })
    //                 .catch(err => {
    //                     dispatchModalError({ err });
    //                 }
    //                 );
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [watch('manufacturer.generation')]);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
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
                            name="manufacturer.make"
                            placeholder={t('vehicles:select-vehicle-make')}
                            control={control}
                            errors={errors}
                            options={manufacturersData.makes}
                            // onChange={([selected],name) => {
                            //     collectStepChanges({
                            //         name: name,
                            //         label: selected.label
                            //     });
                            //     return selected;
                            // }}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:model')} labelTop>
                        <SelectInput
                            name="manufacturer.model"
                            placeholder={t('vehicles:select-vehicle-model')}
                            options={manufacturersData.models}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.make')}
                            // onChange={([selected, option]) => {
                            //     collectStepChanges({
                            //         name: option.name,
                            //         label: selected.label
                            //     });
                            //     return selected;
                            // }}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label="Version" labelTop>
                        <SelectInput
                            name="manufacturer.generation"
                            placeholder={t('vehicles:select-vehicle-generation')}
                            options={manufacturersData.model}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.generation')}
                            // onChange={([selected, option]) => {
                            //     collectStepChanges({
                            //         name: option.name,
                            //         label: selected.label
                            //     });
                            //     return selected;
                            // }}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:year')} labelTop>
                        <SelectInput
                            name="manufacturer.year"
                            placeholder="Select year"
                            options={manufacturersData.years}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.generation')}
                            // onChange={([selected, option]) => {
                            //     collectStepChanges({
                            //         name: option.name,
                            //         label: selected.label
                            //     });
                            //     return selected;
                            // }}
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
