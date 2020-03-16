import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {FieldWrapper, GroupInputs, SelectInput, TextInput} from "../../Inputs";
import CarApiService from "../../../../services/CarApiService";
import {ModalDialogContext} from "../../../Context/ModalDialogContext";
import useIsMounted from "../../../../hooks/useIsMounted";

const Step0_CarManufacturer = memo(({methods, formConfig, getUpdates, triggerSkipStep, onSubmitStep, prevStep, nextStep, ...rest}) => {
    const formRef = useRef(null);
    const isMounted = useIsMounted();
    const {dispatchModal} = useContext(ModalDialogContext);
    const {watch, control, errors, getValues, register, formState, handleSubmit} = methods;
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
        generations: [],
        years: []
    });

    const triggerSubmit = () => {
        console.log("triggerSubmitStep");
        formRef.current.dispatchEvent(new Event('submit'));
    };

    useEffect(() => {
        if(isMounted){
            const values = getValues();
            const findDefault = Object.keys(values).find(key => values[key] && values[key].value === "other");
            if (findDefault) nextStep();
        }
    }, [getValues()]);

    useEffect(() => {
        if(isMounted){
            triggerSubmit();
        }
    }, [watch('manufacturer.year')]);

    useEffect(() => {
        const popularMakesId = [
            3, // AlphaRomeo
            9, // Audi
            16, // BMW
            107, // Peugeot
            117, // Renault
            28, // Citroen
            147, // Volkswagen
            48, // Ford
            88, // Mercedes-Benz
            102, // Opel
            47, // Fiat
            140, // Toyota
            133 // Susuki
        ];
        CarApiService.getMakes(popularMakesId)
            .then(cars => {
                const makesOptions = cars.map(car => ({value: car.make_id, label: car.make}));
                const defaultOption = {value: "other", label: "Autre"};
                setManufacturersData(manufacturersData => (
                    {...manufacturersData, makes: [...makesOptions, defaultOption]})
                );
            })
            .catch(err => {
                dispatchModal({type: 'error', err});
            });
        return function cleanup() {
            console.log('unmount');
        }
    }, []);

    useEffect(() => {
        if (watch('manufacturer.make')) {
            const makeID = watch('manufacturer.make').value;
            if (!isNaN(makeID)) {
                CarApiService.getMakeModels(makeID)
                    .then(models => {
                        const modelsOptions = models.map(model => ({value: model.model_id, label: model.model}));
                        const defaultOption = {value: "other", label: "Autre"};
                        setManufacturersData(manufacturersData => (
                            {...manufacturersData, models: [...modelsOptions, defaultOption]})
                        );
                    })
                    .catch(err => {
                        dispatchModal({type: 'error', err});
                    });
            }
        }
    }, [watch('manufacturer.make')]);

    useEffect(() => {
        if (watch('manufacturer.model')) {
            const makeID = watch('manufacturer.make').value;
            const modelID = watch('manufacturer.model').value;

            if (!isNaN(makeID) && !isNaN(modelID)) {
                CarApiService.getCarGenerations(makeID, modelID)
                    .then(generations => {
                        const generationsOptions = generations.map(
                            ({generation_id, generation}) => ({value: generation_id, label: generation})
                        );
                        const defaultOption = {value: "other", label: "Autre"};
                        setManufacturersData(manufacturersData => (
                            {...manufacturersData, generations: [...generationsOptions, defaultOption]})
                        );
                    })
                    .catch(err => {
                        dispatchModal({type: 'error', err});
                    });
            }
        }
    }, [watch('manufacturer.model')]);

    useEffect(() => {
        if (watch('manufacturer.generation')) {
            const makeID = watch('manufacturer.make').value;
            const modelID = watch('manufacturer.model').value;
            const generationID = watch('manufacturer.generation').value;

            if (!isNaN(makeID) && !isNaN(modelID) && !isNaN(generationID)) {
                CarApiService.getCarYearsVersion(makeID, modelID, generationID)
                    .then(years => {
                        const yearsOptions = years.map(year => ({value: year.year, label: year.year}));
                        setManufacturersData(manufacturersData => (
                            {...manufacturersData, years: yearsOptions})
                        );
                    })
                    .catch(err => {
                        dispatchModal({type: 'error', err});
                    });
            }
        }
    }, [watch('manufacturer.generation')]);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <button type="button" onClick={()=>console.log(getValues())}>CLICK</button>

            <FieldWrapper label="VIN">
                <TextInput
                    name="vin"
                    placeholder="VIN number"
                    register={register}
                    errors={errors}
                />
            </FieldWrapper>

            <GroupInputs label="Sélectionnez votre voiture" labelTop>

                <FieldWrapper label="Marque" labelTop>
                        <SelectInput
                            name="manufacturer.make"
                            placeholder="Select a car make"
                            control={control}
                            rules={{required: "Field required"}}
                            options={manufacturersData['makes']}
                        />
                </FieldWrapper>

                {watch('manufacturer.make') &&
                    <FieldWrapper label="Modele" labelTop>
                        <SelectInput
                            name="manufacturer.model"
                            placeholder="Select a car model"
                            options={manufacturersData['models']}
                            rules={{required: "Field required"}}
                            errors={errors}
                            control={control}
                        />
                    </FieldWrapper>
                }

                {watch('manufacturer.model') &&
                    <FieldWrapper label="Version" labelTop>
                        <SelectInput
                            name="manufacturer.generation"
                            placeholder="Select car version"
                            options={manufacturersData['generations']}
                            control={control}
                            rules={{required: "Field required"}}
                            errors={errors}
                        />
                    </FieldWrapper>
                }

                {watch('manufacturer.generation') &&
                    <FieldWrapper label="Année" labelTop>
                        <SelectInput
                            name="manufacturer.year"
                            placeholder="Select car year"
                            options={manufacturersData['years']}
                            control={control}
                            rules={{required: "Field required"}}
                            errors={errors}
                        />
                    </FieldWrapper>
                }
            </GroupInputs>

            <button className="btn" onClick={triggerSkipStep}>Passer cette étape</button>
        </form>
    )
});

export default Step0_CarManufacturer;
