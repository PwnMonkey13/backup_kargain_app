import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import useTranslation from 'next-translate/useTranslation';
import { SelectInput, SliderInput } from '../../Form/Inputs';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import FieldWrapper from '../../Form/FieldWrapper';
import SearchLocationInput from '../../Form/Inputs/SearchLocationInput';
import { RadioChoicesGas } from '../../Products/car/form.data';
import useAddress from '../../../hooks/useAddress';

const popularMakesOptions = [
    {
        label: 'AlphaRomeo',
        value: 3
    },
    {
        label: 'Audi',
        value: 9
    },
    {
        label: 'BMW',
        value: 16
    },
    {
        label: 'Peugeot',
        value: 107
    },
    {
        label: 'Renault',
        value: 117
    },
    {
        label: 'Citroen',
        value: 28
    },
    {
        label: 'Volkswagen',
        value: 147
    },
    {
        label: 'Ford',
        value: 48
    },
    {
        label: 'Mercedes-Benz',
        value: 88
    },
    {
        label: 'Opel',
        value: 182
    },
    {
        label: 'Fiat',
        value: 47
    },
    {
        label: 'Toyota',
        value: 140
    },
    {
        label: 'Susuki',
        value: 133
    }
];

const LightFiltersForm = ({ control, watch, errors }) => {
    const [, , coordinates] = useAddress();
    const { t } = useTranslation();

    useEffect(() => {
        control.register({ name: 'coordinates' });
        control.setValue('coordinates', coordinates);
    }, [coordinates]);

    const countrySelect = watch('countrySelect');

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:make')}>
                        <SelectInput
                            name="manufacturer.make"
                            control={control}
                            errors={errors}
                            options={popularMakesOptions}
                        />
                    </FieldWrapper>
                </Col>

                <Col md={6}>
                    {/*<FieldWrapper label={t('vehicles:model')}>*/}
                    {/*    <SelectInput*/}
                    {/*        name="manufacturer.model"*/}
                    {/*        control={control}*/}
                    {/*        errors={errors}*/}
                    {/*        options={popularMakesOptions}*/}
                    {/*    />*/}
                    {/*</FieldWrapper>*/}
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    {/*<FieldWrapper label={t('vehicles:version')}>*/}
                    {/*    <SelectInput*/}
                    {/*        name="manufacturer.version"*/}
                    {/*        control={control}*/}
                    {/*        errors={errors}*/}
                    {/*        options={popularMakesOptions}*/}
                    {/*    />*/}
                    {/*</FieldWrapper>*/}
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

LightFiltersForm.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
};

export default React.memo(LightFiltersForm);
