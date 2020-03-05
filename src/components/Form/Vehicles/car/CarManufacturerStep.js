import React, {useRef, useState, useEffect, useContext} from "react";
import {useForm} from "react-hook-form";
import useIsMounted from "../../../../hooks/useIsMounted";
import {GroupInputs, SelectInput} from "../../Inputs";
import CarApiService from "../../../../services/CarApiService";
import StepNavigation from "../../StepNavigation";

const CarManufacturerStep = ({formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const isMountRef = useIsMounted();
    const formRef = useRef(null);
    const {watch, control, errors, getValues, register, handleSubmit} = useForm(formConfig);
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
        generations: [],
        years: []
    });

    const triggerSubmit = () => {
        // console.log("triggerSubmit");
        formRef.current.dispatchEvent(new Event('submit'))
    };

    useEffect(() => {
        // console.log('mounted');
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
                setManufacturersData(manufacturersData => ({...manufacturersData, makes: makesOptions}));
            })
            .catch(err => console.log(err));

        return function cleanup() {
            // console.log('niktamere');
        }
    }, []);

    useEffect(() => {
        if (watch('manufacturer[make]')) {
            const makeID = watch('manufacturer[make]').value;
            if (!isNaN(makeID)) {
                CarApiService.getMakeModels(makeID)
                    .then(models => {
                        const modelsOptions = models.map(model => ({value: model.model_id, label: model.model}));
                        setManufacturersData(manufacturersData => ({...manufacturersData, models: modelsOptions}));
                    })
                    .catch(err => console.log(err));
            }
        }
    }, [watch('manufacturer[make]')]);

    useEffect(() => {
        if (watch('manufacturer[model]')) {
            const makeID = watch('manufacturer[make]').value;
            const modelID = watch('manufacturer[model]').value;
            if (!isNaN(makeID) && !isNaN(modelID)) {
                CarApiService.getCarGenerations(makeID, modelID)
                    .then(generations => {
                        const generationsOptions = generations.map(({generation_id, generation}) => ({
                            value: generation_id,
                            label: generation
                        }));
                        setManufacturersData(manufacturersData => ({
                            ...manufacturersData,
                            generations: generationsOptions
                        }));
                    })
                    .catch(err => console.log(err));
            }
        }
    }, [watch('manufacturer[model]')]);

    useEffect(() => {
        if (watch('manufacturer[generation]')) {
            const makeID = watch('manufacturer[make]').value;
            const modelID = watch('manufacturer[model]').value;
            const generationID = watch('manufacturer[generation]').value;

            if (!isNaN(makeID) && !isNaN(modelID) && !isNaN(generationID)) {
                CarApiService.getCarYearsVersion(makeID, modelID, generationID)
                    .then(years => {
                        const yearsOptions = years.map(year => ({value: year.year, label: year.year}));
                        setManufacturersData(manufacturersData => ({...manufacturersData, years: yearsOptions}));
                    })
                    .catch(err => console.log(err));
            }
        }
    }, [watch('manufacturer[generation]')]);

    useEffect(() => {
        if (watch('manufacturer[year]')) {
            triggerSubmit();
        }
    }, [watch('manufacturer[year]')]);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>

            <GroupInputs as="h4" tile="">
                <SelectInput
                    label="Marque"
                    name="manufacturer[make]"
                    placeholder="Select a car make"
                    options={manufacturersData['makes']}
                    control={control}
                    rules={{required: "Field required"}}
                />

                {watch('manufacturer[make]') &&
                <SelectInput
                    label="Modele"
                    name="manufacturer[model]"
                    placeholder="Select a car model"
                    options={manufacturersData['models']}
                    control={control}
                    rules={{required: "Field required"}}
                    errors={errors}
                />
                }

                {watch('manufacturer[model]') &&
                <SelectInput
                    label="Version"
                    name="manufacturer[generation]"
                    placeholder="Select car version"
                    options={manufacturersData['generations']}
                    control={control}
                    rules={{required: "Field required"}}
                    errors={errors}
                />
                }

                {watch('manufacturer[generation]') &&
                <SelectInput
                    label="Année"
                    name="manufacturer[year]"
                    placeholder="Select car year"
                    options={manufacturersData['years']}
                    control={control}
                    rules={{required: "Field required"}}
                    errors={errors}
                />
                }
            </GroupInputs>
            <StepNavigation prev={prevStep} submit />
        </form>
    )
};

export default CarManufacturerStep;
