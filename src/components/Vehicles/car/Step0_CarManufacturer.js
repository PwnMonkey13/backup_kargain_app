import React, { useContext, useEffect, useRef, useState } from 'react'
import Divider from '../../Divider'
import Header from '../../Header'
import { Col, Row } from 'reactstrap'
import useIsMounted from '../../../hooks/useIsMounted'
import FieldWrapper from '../../Form/FieldWrapper'
import StepNavigation from '../../Form/StepNavigation'
import ToolTipWrapper from '../../Form/ToolTipWrapper'
import { SelectInput, TextInput } from '../../Form/Inputs'
import { ModalDialogContext } from '../../../context/ModalDialogContext'
import CarApiService from '../../../services/vehicles/CarApiService'
import VinDecoderService from '../../../services/VinDecoderService'

const ColCenter = ({ children }) => <Col className="d-flex flex-column align-items-center">{children}</Col>

const Step0CarManufacturer = ({ methods, formConfig, collectStepChanges, triggerSkipStep, onSubmitStep, prevStep, nextStep, ...rest }) => {
    const formRef = useRef(null)
    const isMounted = useIsMounted()
    const { dispatchModal } = useContext(ModalDialogContext)
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = methods
    const [vinDecoded, storeVinDecoded] = useState(null)
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
        generations: [],
        years: []
    })

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
    ]

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'))
    }

    const isValidVIN = async (value) => {
        if (value) {
            const match = /[a-zA-Z0-9]{9}[a-zA-Z0-9-]{2}[0-9]{6}/.test(value)
            if (match) {
                try {
                    const result = await VinDecoderService.decodeVINFree(value)
                    storeVinDecoded(result)
                } catch (err) {
                    dispatchModal({ type: 'error', err })
                }
            } else return 'INVALID VIN NUMBER'
        }
    }

    useEffect(() => {
        if (isMounted && vinDecoded != null) {
            setValue('manufacturer', { make: { label: vinDecoded.Make, value: vinDecoded.Make } })
            setValue('manufacturer', { model: { label: vinDecoded.Model, value: vinDecoded.Model } })
            setValue('manufacturer', { year: { label: vinDecoded.ModelYear, value: vinDecoded.ModelYear } })
        }
    }, [vinDecoded])

    useEffect(() => {
        if (isMounted) {
            const values = getValues()
            const findDefault = Object.keys(values).find(key => values[key] && values[key].value === 'other')
            if (findDefault) nextStep()
        }
    }, [getValues()])

    useEffect(() => {
        if (isMounted &&
            watch('manufacturer.make') &&
            watch('manufacturer.model') &&
            watch('manufacturer.year')) {
            triggerSubmit()
        }
    }, [watch('manufacturer.year')])

    useEffect(() => {
        console.log('fetch makes')
        CarApiService.getMakes(popularMakesId)
            .then(cars => {
                const makesOptions = cars.map(car => ({ value: car.make_id, label: car.make }))
                const defaultOption = { value: 'other', label: 'Je ne sais pas/Autre' }
                setManufacturersData(manufacturersData => (
                    { ...manufacturersData, makes: [...makesOptions, defaultOption] })
                )
            })
            .catch(err => {
                dispatchModal({ type: 'error', err })
            })
        return function cleanup () {
            console.log('unmount')
        }
    }, [])

    useEffect(() => {
        if (watch('manufacturer.make') && vinDecoded == null) {
            const makeID = watch('manufacturer.make').value
            if (!isNaN(makeID)) {
                CarApiService.getMakeModels(makeID)
                    .then(models => {
                        const modelsOptions = models.map(model => ({ value: model.model_id, label: model.model }))
                        const defaultOption = { value: 'other', label: 'Je ne sais pas/Autre' }
                        setManufacturersData(manufacturersData => (
                            { ...manufacturersData, models: [...modelsOptions, defaultOption] })
                        )
                    })
                    .catch(err => {
                        dispatchModal({ type: 'error', err })
                    })
            }
        }
    }, [watch('manufacturer.make')])

    useEffect(() => {
        if (watch('manufacturer.model') && vinDecoded == null) {
            const makeID = watch('manufacturer.make').value
            const modelID = watch('manufacturer.model').value
            if (!isNaN(makeID) && !isNaN(modelID)) {
                CarApiService.getCarGenerations(makeID, modelID)
                    .then(generations => {
                        const generationsOptions = generations.map(
                            // eslint-disable-next-line camelcase
                            ({ generation_id, generation }) => ({ value: generation_id, label: generation })
                        )
                        const defaultOption = { value: 'other', label: 'Je ne sais pas/Autre' }
                        setManufacturersData(manufacturersData => (
                            { ...manufacturersData, generations: [...generationsOptions, defaultOption] })
                        )
                    })
                    .catch(err => {
                        dispatchModal({ type: 'error', err })
                    })
            }
        }
    }, [watch('manufacturer.model')])

    useEffect(() => {
        if (watch('manufacturer.generation') && vinDecoded == null) {
            const makeID = watch('manufacturer.make').value
            const modelID = watch('manufacturer.model').value
            const generationID = watch('manufacturer.generation').value

            if (!isNaN(makeID) && !isNaN(modelID) && !isNaN(generationID)) {
                CarApiService.getCarYearsVersion(makeID, modelID, generationID)
                    .then(years => {
                        const yearsOptions = years.map(year => ({ value: year.year, label: year.year }))
                        setManufacturersData(manufacturersData => (
                            { ...manufacturersData, years: yearsOptions })
                        )
                    })
                    .catch(err => {
                        dispatchModal({ type: 'error', err })
                    }
                    )
            }
        }
    }, [watch('manufacturer.generation')])

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Row>
                <ColCenter>
                    <FieldWrapper label="Saisissez le numéro VIN de votre moto" tooltip={
                        <ToolTipWrapper
                            icon="?"
                            template="default">
                            <p> Le numéro VIN, où Numéro d’Identification du Véhicule, est une série de caractères qui va permettre de
                                distinguer tous les véhicules partout dans le monde. <br/> Vous pourrez retrouver ce numéro à
                                plusieurs endroits de votre voiture et sera indispensable pour certaines démarches administratives <br/>
                                Pour plus d'informations : <a href="https://www.boutiqueobdfacile.fr/blog/numero-vin-p73.html">https://www.boutiqueobdfacile.fr/blog/numero-vin-p73.html</a>
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

            <Divider text="ou"/>

            <Header text="Sélectionnez votre voiture"/>

            <Row>
                <Col md={3}>
                    <FieldWrapper label="Marque" labelTop>
                        <SelectInput
                            name="manufacturer.make"
                            placeholder="Select a car make"
                            control={control}
                            errors={errors}
                            rules={{ required: 'Title is required!' }}
                            options={manufacturersData.makes}
                            onChange={([selected, option]) => {
                                collectStepChanges({ name: option.name, label: selected.label })
                                return selected
                            }}
                        />
                    </FieldWrapper>
                </Col>
                <Col md={3}>
                    <FieldWrapper label="Modele" labelTop>
                        <SelectInput
                            name="manufacturer.model"
                            placeholder="Select a car model"
                            options={manufacturersData.models}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.make')}
                            onChange={([selected, option]) => {
                                collectStepChanges({ name: option.name, label: selected.label })
                                return selected
                            }}
                        />
                    </FieldWrapper>
                </Col>
                <Col md={3}>
                    <FieldWrapper label="Version" labelTop>
                        <SelectInput
                            name="manufacturer.generation"
                            placeholder="Select car version"
                            options={manufacturersData.model}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.generation')}
                            onChange={([selected, option]) => {
                                collectStepChanges({ name: option.name, label: selected.label })
                                return selected
                            }}
                        />
                    </FieldWrapper>
                </Col>
                <Col md={3}>
                    <FieldWrapper label="Année" labelTop>
                        <SelectInput
                            name="manufacturer.year"
                            placeholder="Select car year"
                            options={manufacturersData.years}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.generation')}
                            onChange={([selected, option]) => {
                                collectStepChanges({ name: option.name, label: selected.label })
                                return selected
                            }}
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            <button className="btn" onClick={triggerSkipStep}>Passer cette étape</button>
            <StepNavigation prev={prevStep} submit />
        </form>
    )
}

export default Step0CarManufacturer
