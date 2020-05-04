import React, { useContext, useEffect, useRef, useState } from 'react'
import Divider from '../../Divider'
import Header from '../../Header'
import FieldWrapper from '../../Form/FieldWrapper'
import StepNavigation from '../../Form/StepNavigation'
import { SelectInput, TextInput } from '../../Form/Inputs'
import useIsMounted from '../../../hooks/useIsMounted'
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils'
import { ModalDialogContext } from '../../../context/ModalDialogContext'
import VinDecoderService from '../../../services/VinDecoderService'
import MotorsBikesApiService from '../../../services/vehicles/MotorsBikesApiService'
import { Col, Row } from 'reactstrap'
import ToolTipWrapper from '../../Form/ToolTipWrapper'

const ColCenter = ({ children }) => <Col className="d-flex flex-column align-items-center">{children}</Col>

const Step0_MotosSelector = ({ methods, formConfig, collectStepChanges, triggerSkipStep, onSubmitStep, prevStep, nextStep, ...rest }) => {
    const formRef = useRef(null)
    const isMounted = useIsMounted()
    const { dispatchModal } = useContext(ModalDialogContext)
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = methods
    const [vinDecoded, storeVinDecoded] = useState(null)
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: []
    })

    const popularMakes = [
        'Aprilia',
        'BMW',
        'Ducati',
        'Honda',
        'Harley-Davidson',
        'Husqvarna',
        'Kawasaki',
        'KTM',
        'Suzuki',
        'Triumph',
        'Yamaha',
        'Royal Enfield'
    ]

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

    const triggerSubmit = () => {
        console.log('triggerSubmitStep')
        formRef.current.dispatchEvent(new Event('submit'))
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
        if (isMounted && watch('manufacturer.make') && watch('manufacturer.motorcycle')) {
            triggerSubmit()
        }
    }, [watch('manufacturer.motorcycle')])

    useEffect(() => {
        console.log('fetch makes')
        MotorsBikesApiService.getMakes(popularMakes)
            .then(motos => {
                const makesOptions = motos.map(car => ({ value: car.make, label: car.make }))
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
            const make = watch('manufacturer.make').value
            if (make) {
                MotorsBikesApiService.getMakeModels(make)
                    .then(data => data.models)
                    .then(models => {
                        const modelsOptions = models.map(model => ({ value: model.model, label: model.model }))
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

            <Header text="Sélectionnez votre moto"/>

            <Row>
                <Col>
                    <FieldWrapper label="Marque" labelTop>
                        <SelectInput
                            name="manufacturer.make"
                            placeholder="Select a motorcycle make"
                            control={control}
                            errors={errors}
                            rules={{ required: 'Title is required!' }}
                            featured={SelectOptionsUtils(popularMakes)}
                            options={manufacturersData.makes}
                            onChange={([selected, option]) => {
                                collectStepChanges({ name: option.name, label: selected.label })
                                return selected
                            }}
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
                            rules={{ required: 'Title is required!' }}
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
export default Step0_MotosSelector
