import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import Header from '../../Header';
import FieldWrapper from '../../Form/FieldWrapper';
import StepNavigation from '../../Form/StepNavigation';
import ToolTipWrapper from '../../Form/ToolTipWrapper';
import { SelectInput, TextInput } from '../../Form/Inputs';
import useIsMounted from '../../../hooks/useIsMounted';
import { FormContext } from '../../../context/FormContext';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import VinDecoderService from '../../../services/VinDecoderService';
import InternalVehiclesApiService from '../../../services/vehicles/InternalVehiclesApiService';

const ColCenter = ({ children }) => <Col className="d-flex flex-column align-items-center">{children}</Col>;

const Step0_MotosManufacturer = ({ collectStepChanges, triggerSkipStep, onSubmitStep, prevStep, nextStep, ...rest }) => {
    const formRef = useRef(null);
    const isMounted = useIsMounted();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { formDataContext } = useContext(FormContext);
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext
    });
    const [vinDecoded, storeVinDecoded] = useState(null);
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: []
    });

    const isValidVIN = async (value) => {
        if (value) {
            const match = /[a-zA-Z0-9]{9}[a-zA-Z0-9-]{2}[0-9]{6}/.test(value);
            if (match) {
                try {
                    const result = await VinDecoderService.decodeVINFree(value);
                    storeVinDecoded(result);
                } catch (err) {
                    dispatchModalError({ err });
                }
            } else {
                return 'INVALID VIN NUMBER';
            }
        }
    };

    const triggerSubmit = () => {
        console.log('triggerSubmitStep');
        formRef.current.dispatchEvent(new Event('submit'));
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
    }, [vinDecoded]);

    useEffect(() => {
        if (isMounted) {
            const values = getValues();
            const findDefault = Object.keys(values).find(key => values[key] && values[key].value === 'other');
            if (findDefault) nextStep();
        }
    }, [getValues()]);

    useEffect(() => {
        if (isMounted && watch('manufacturer.make') && watch('manufacturer.model')) {
            triggerSubmit();
        }
    }, [watch('manufacturer.model')]);

    useEffect(() => {
        console.log('fetch makes');
        InternalVehiclesApiService.getMakes()
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
        return function cleanup () {
            console.log('unmount');
        };
    }, []);

    useEffect(() => {
        if (watch('manufacturer.make')) {
            console.log('fetch 2');
            const make = watch('manufacturer.make').value;
            if (make) {
                InternalVehiclesApiService.getMakeModels(make)
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
    }, [watch('manufacturer.make')]);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>

            <Row>
                <ColCenter>
                    <FieldWrapper label="Saisissez le numéro VIN de votre camping-car" tooltip={
                        <ToolTipWrapper
                            icon="?"
                            template="default">
                            <p> Le numéro VIN, où Numéro d’Identification du Véhicule, est une série de caractères qui
                                va permettre de
                                distinguer tous les véhicules partout dans le monde. <br/> Vous pourrez retrouver ce
                                numéro à
                                plusieurs endroits de votre voiture et sera indispensable pour certaines démarches
                                administratives <br/>
                                Pour plus d'informations : <a
                                    href="https://www.boutiqueobdfacile.fr/blog/numero-vin-p73.html">https://www.boutiqueobdfacile.fr/blog/numero-vin-p73.html</a>
                            </p>
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

            <Header text="Sélectionnez votre camping-car"/>

            <Row>
                <Col>
                    <FieldWrapper label="Marque" labelTop>
                        <SelectInput
                            name="manufacturer.make"
                            placeholder="Select a camper make"
                            control={control}
                            errors={errors}
                            options={manufacturersData.makes}
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
                <Col>
                    <FieldWrapper label="Modele" labelTop>
                        <SelectInput
                            name="manufacturer.model"
                            placeholder="Select a camper model"
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
