import React, { memo, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { flatten } from 'flattenjs'
import styled from 'styled-components'
import { RadioGroupInput, SelectInput } from '../Form/Inputs'
import useIsMounted from '../../hooks/useIsMounted'
import Header from '../Header'
import Spacer from '../Spacer'

const Form = styled.form`
     display: flex;
     flex-direction: column;
     border: 1px solid #dce0e0;
     background-color: #f7f8f9;
     border-radius: .1875rem;
     background-color: #fff;
     padding: 10px;
  `

const Filters = ({ defaultFilters, updateFilters: fireFilters }) => {
    const isMounted = useIsMounted()
    const formRef = useRef(null)
    const [filters, setFilters] = useState(defaultFilters)

    const formConfig = {
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: defaultFilters
    }

    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm(formConfig)

    const prepareFilters = (filters) => {
        const flattened = flatten(filters)
        return Object.keys(flattened).reduce((carry, key) => {
            if (flattened[key]) {
                carry[key] = typeof flattened[key] === 'string' ? flattened[key].toLowerCase() : flattened[key]
            }
            return carry
        }, {})
    }

    const onSubmit = (data, e) => {
        e.preventDefault()
        setFilters(data)
    }

    const ControlButtons = () => (
        <div className="d-flex flex-column my-3">
            <button className="btn btn-primary"type="submit"><strong>Appliquer filtres</strong></button>
            <button className="mt-2" type="button" onClick={() => window.location.reload()}>Reinitialiser</button>
        </div>
    )

    return (
        <form className="d-flex flex-column form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <ControlButtons/>
            <Header p strong className="m-0" text="Type d'annonce :"/>
            <RadioGroupInput
                name="adType"
                noInputClass
                control={control}
                errors={errors}
                options={[
                    {
                        label: 'Location',
                        value: 'rent'
                    },
                    {
                        label: 'Vente',
                        value: 'sale'
                    }]
                }
            />

            <SelectInput
                name="manufacturer.make"
                placeholder="Marque:"
                control={control}
                errors={errors}
            />

            <SelectInput
                name="manufacturer.model"
                placeholder="Modele"
                control={control}
                errors={errors}
                disabled={!watch('manufacturer.make')}
            />

            <Spacer/>
            <ControlButtons/>
        </form>
    )
}

Filters.defaultProps = {
    defaultFilters: {
        vehicleType: 'car',
        adType: 'sale'
    }
}

export default memo(Filters)
