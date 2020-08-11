import React, { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import Alert from '@material-ui/lab/Alert'
import filterProps from '../../../libs/filterProps'
import LightFiltersForm from './LightFiltersForm';
import FieldWrapper from '../../Form/FieldWrapper';
import { TextInput } from '../../Form/Inputs';
import CTAButton from '../../CTAButton';
import CTALink from '../../CTALink'

const AnnounceTypes = [
    {
        value: 'sale',
        label: 'Vente'
    },
    {
        value: 'sale-pro',
        label: 'Vente pro'
    },
    {
        value: 'rent',
        label: 'Location'
    }
]

const LightFilters = ({query, defaultFilters, vehicleType, updateFilters}) => {
    const { t } = useTranslation()
    const { control, errors, watch, register, setValue, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues : defaultFilters
    })

    const onSubmit = (form, e) => {
        const { coordinates, radius } = form;
        const filtersFlat = filterProps(form);
        const data = { ...filtersFlat };

        if (coordinates && radius) {
            data.radius = radius;
            data.coordinates = coordinates;
            data.enableGeocoding = true;
        }

        e.preventDefault();
        updateFilters(data);
    }

    useEffect(()=>{
        register("vehicleType")
    },[])

    useEffect(()=>{
        setValue("vehicleType", vehicleType)
    },[vehicleType])

    return(
        <form className="form_wizard my-4" onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h3" variant="h3" gutterBottom className="text-center">{t('vehicles:announce-type')}</Typography>
            <Row className="justify-content-center">
                {AnnounceTypes && AnnounceTypes.map((tab, index) => {
                    return (
                        <Col key={index} xs={6} sm={3} md={3} lg={4}>
                            <div className="form-check-transparent"
                                style={{ minHeight: '5rem' }}>
                                <input id={`ad_type${index}`}
                                    type="radio"
                                    name="adType"
                                    value={tab.value}
                                    ref={register}
                                />
                                <label htmlFor={`ad_type${index}`}>
                                    <Typography component="h3" variant="h3">{tab.label}</Typography>
                                </label>
                            </div>
                        </Col>
                    )
                })}
            </Row>

            <FieldWrapper label={t('vehicles:announce-title')}>
                <TextInput
                    name="title"
                    errors={errors}
                    control={control}
                    defaultValue={query}
                />
            </FieldWrapper>

            <LightFiltersForm
                control={control}
                errors={errors}
                watch={watch}
            />

            {Object.keys(errors).length !== 0 && (
                <Alert severity="warning" className="mb-2">
                    {t('vehicles:correct-errors')}
                </Alert>
            )}

            <Row style={{width: "fitContent", margin: "0 auto", justifyContent : "center" }}>
                <div className="submit mx-2">
                    <CTALink href="/advanced-search" title="Recherche avancée"/>
                </div>

                <div className="submit mx-2">
                    <CTAButton submit title="Afficher les résultats"/>
                </div>
            </Row>
        </form>
    )
}

LightFilters.defaultProps = {
    vehicleType : 'car',
    defaultFilters: {
        vehicleType: 'car',
        adType: 'sale',
        price: [0, 200000],
        'vehicleEngineCylinder': [1, 20],
        mileage: [0, 200000],
        'powerKw': [0, 200],
        radius: 0,
        'consumptionGkm': [0, 200],
        doors: [1, 10],
        seats: [1, 10]
    }
};

export default LightFilters
