import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import useTranslation from 'next-translate/useTranslation';
import { SelectInput, SliderInput } from '../../Form/Inputs';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import FieldWrapper from '../../Form/FieldWrapper';
import SearchLocationInput from '../../Form/Inputs/SearchLocationInput';
import { RadioChoicesGas } from '../../Products/car/form.data';
import useAddress from '../../../hooks/useAddress';
import VehiclesService from '../../../services/VehiclesService'
import { MessageContext } from '../../../context/MessageContext'
import {vehicleTypeRefModels} from '../../../business/vehicleTypes'

// const popularMakesOptions = [
//     {
//         label: 'AlphaRomeo',
//         value: 3
//     },
//     {
//         label: 'Audi',
//         value: 9
//     },
//     {
//         label: 'BMW',
//         value: 16
//     },
//     {
//         label: 'Peugeot',
//         value: 107
//     },
//     {
//         label: 'Renault',
//         value: 117
//     },
//     {
//         label: 'Citroen',
//         value: 28
//     },
//     {
//         label: 'Volkswagen',
//         value: 147
//     },
//     {
//         label: 'Ford',
//         value: 48
//     },
//     {
//         label: 'Mercedes-Benz',
//         value: 88
//     },
//     {
//         label: 'Opel',
//         value: 182
//     },
//     {
//         label: 'Fiat',
//         value: 47
//     },
//     {
//         label: 'Toyota',
//         value: 140
//     },
//     {
//         label: 'Susuki',
//         value: 133
//     }
// ];

const HomeFiltersForm = ({ vehicleType, methods }) => {
    const cache = useRef({});
    const { t } = useTranslation();
    const isCar = vehicleType === "car"
    const [, , coordinates] = useAddress();
    const vehicleTypeModel = vehicleTypeRefModels[vehicleType]
    const { setValue, control, errors, watch } = methods;
    const countrySelect = watch('countrySelect');
    const selectedMake = watch('manufacturer.make')
    const selectedModel = watch('manufacturer.model')
    const { dispatchModalError } = useContext(MessageContext);
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
        generations: [],
        years: []
    });

    const fetchMakes = useCallback(async () => {
        const cacheKey = `${vehicleType}_makes`;

        if(!cache.current[cacheKey]) {
            console.log('fetch makes');
            await VehiclesService.getMakes(vehicleTypeModel)
                .then(makes => {
                    if(!Array.isArray(makes)) makes = [makes]
                    const makesOptions = makes.map(make => ({
                        value: make._id,
                        label: make.make
                    }));

                    const defaultOption = {
                        value: 'other',
                        label: 'Je ne sais pas/Autre'
                    };

                    const data = [...makesOptions, defaultOption]
                    cache.current[cacheKey] = data;

                    setManufacturersData(manufacturersData => (
                        {
                            ...manufacturersData,
                            makes: data
                        })
                    );
                })
                .catch(err => {
                    dispatchModalError({ err });
                });
        } else{
            setManufacturersData(manufacturersData => (
                {
                    ...manufacturersData,
                    makes: cache.current[cacheKey]
                })
            );
        }

    },[vehicleTypeModel])

    const fetchModels = useCallback(async ()=> {
        const make = selectedMake?.label;
        const cacheKey = `${vehicleType}_makes_${make}_models`;

        if (!make) return
        if(!cache.current[cacheKey]) {
            console.log('fetch models');
            const modelsService = isCar ? VehiclesService.getCarsDistinctModels
                : VehiclesService.getMakeModels

            await modelsService(vehicleTypeModel, make)
                .then(models => {
                    console.log(models)
                    if(!Array.isArray(models)) models = [models]
                    let modelsOptions = [];

                    if(isCar){
                        modelsOptions = models.map(model => ({
                            value: model,
                            label: model
                        }));
                    }
                    else {
                        modelsOptions = models.map(model => ({
                            value: model._id,
                            label: model.model
                        }));
                    }

                    const defaultOption = {
                        value: 'other',
                        label: 'Je ne sais pas/Autre'
                    };

                    const data = [...modelsOptions, defaultOption]
                    cache.current[cacheKey] = data;

                    setManufacturersData(manufacturersData => (
                        {
                            ...manufacturersData,
                            models: data
                        })
                    );
                })
                .catch(err => {
                    dispatchModalError({
                        err,
                        persist: true
                    });
                });
        } else {
            setManufacturersData(manufacturersData => (
                {
                    ...manufacturersData,
                    models: cache.current[cacheKey]
                })
            );
        }
    },[selectedMake])

    const fetchModelsYears = useCallback(async() => {
        const make = selectedMake?.value;
        const model = selectedModel?.value;
        const cacheKey = `${vehicleType}_makes_${make}_models_${model}`;

        if (!make || !model) return
        if(!cache.current[cacheKey]) {
            console.log('fetch cars models years');
            await VehiclesService.getCarsMakeModelTrimYears(make, model)
                .then(years => {
                    if(!Array.isArray(years)) years = [years]

                    const yearsOptions = years.map(year => ({
                        value: year._id,
                        label: year.year
                    }));

                    const defaultOption = {
                        value: 'other',
                        label: 'Je ne sais pas/Autre'
                    };

                    const data = [...yearsOptions, defaultOption]
                    cache.current[cacheKey] = data;

                    setManufacturersData(manufacturersData => (
                        {
                            ...manufacturersData,
                            years: data
                        })
                    );
                })
                .catch(err => {
                    dispatchModalError({ err });
                });
        } else {
            setManufacturersData(manufacturersData => (
                {
                    ...manufacturersData,
                    years: cache.current[cacheKey]
                })
            );
        }
    },[vehicleTypeModel])

    useEffect(() => {
        control.register({ name: 'coordinates' });
        control.setValue('coordinates', coordinates);
    }, [coordinates]);

    useEffect(() => {
        setValue('manufacturer.make', null)
        setValue('manufacturer.model', null)
        setValue('manufacturer.year', null)
    }, [vehicleType]);

    useEffect(() => {
        fetchMakes()
    }, [fetchMakes]);

    useEffect(() => {
        const make = selectedMake?.label;
        if (!make) return
        fetchModels()
    }, [selectedMake, fetchModels]);

    useEffect(() => {
        const model = selectedModel?.label;
        if (!model) return
        fetchModelsYears()
    }, [selectedModel, fetchModelsYears]);

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:make')}>
                        <SelectInput
                            name="manufacturer.make"
                            control={control}
                            errors={errors}
                            options={manufacturersData.makes}
                        />
                    </FieldWrapper>
                </Col>

                <Col md={6}>
                    <FieldWrapper label={t('vehicles:model')}>
                        <SelectInput
                            name="manufacturer.model"
                            options={manufacturersData.models}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.make')}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:year')}>
                        <SelectInput
                            name="year"
                            placeholder="Select year"
                            options={manufacturersData.years}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.model') || !isCar}
                        />
                    </FieldWrapper>
                </Col>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:price')}>
                        <SliderInput
                            classNames="my-4 mt-2"
                            name="price"
                            min={0}
                            max={200000}
                            step={1000}
                            errors={errors}
                            control={control}
                            suffix="€"
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:mileage')}>
                        <SliderInput
                            classNames="my-4 mt-2"
                            name="mileage"
                            min={0}
                            max={200000}
                            step={1000}
                            errors={errors}
                            control={control}
                            suffix="km"
                        />
                    </FieldWrapper>
                </Col>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:gas')}>
                        <SelectInput
                            name="vehicleEngineGas"
                            className="mb-2"
                            options={RadioChoicesGas}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:country')}>
                        <SelectCountryFlags
                            name="countrySelect"
                            errors={errors}
                            control={control}
                        />
                    </FieldWrapper>
                </Col>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:address')}>
                        <SearchLocationInput
                            name="address"
                            country={countrySelect?.value}
                            errors={errors}
                            control={control}>
                        </SearchLocationInput>
                    </FieldWrapper>
                </Col>
            </Row>
        </Container>
    );
};

HomeFiltersForm.defaultProps = {
    vehicleType : 'car'
}

HomeFiltersForm.propTypes = {
    methods: PropTypes.object.isRequired
};

export default React.memo(HomeFiltersForm);
