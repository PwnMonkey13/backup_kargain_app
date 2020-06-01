import React, { useRef, useContext } from 'react'
import { Col, Row } from 'reactstrap'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Header from '../Header'
import Divider from '../Divider'
import { FormContext } from '../../context/FormContext'

const VehicleTypeSelectorStep = ({ handleSelectVehicleType, ...props }) => {
    const formRef = useRef(null)
    const { register, handleSubmit } = useForm()
    const { dispatchFormUpdate } = useContext(FormContext)

    const tabsRadio = [
        {
            value: 'car',
            label: 'Voiture',
            img: 'tab-car.png'
        },
        {
            value: 'moto',
            label: 'Moto/Scooter',
            img: 'tab-moto.png'
        },
        {
            value: 'camper',
            label: 'Camping car',
            img: 'tab-camper.png'
        },
        {
            value: 'bus',
            label: 'Bus/Camion',
            img: 'tab-bus.png'
        },
        {
            value: 'utility',
            label: 'Utilitaire',
            img: 'tab-gruz.png'
        }
    ]

    const othersForm = []

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'))
    }

    const onSubmit = (data) => {
        const tab = tabsRadio.find(tab => tab.value === data.vehicleType)
        dispatchFormUpdate({ vehicleType: { value: tab.value, label: tab.label } })
        handleSelectVehicleType(data.vehicleType)
    }

    const Img = styled.img`
        max-width:80px;
        object-fit:contain;
    `

    return (
        <form className="form_wizard my-4" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-center">
                { tabsRadio && tabsRadio.map((tab, index) => {
                    return (
                        <Col key={index} xs={6} sm={3} md={3} lg={2}>
                            <div className="form-check form-check-vehicle m-0" style={{ minHeight: '5rem' }}>
                                <input id={`vehicle_type${index}`}
                                    type="radio"
                                    name="vehicleType"
                                    value={tab.value}
                                    ref={register}
                                    onChange={() => triggerSubmit()}
                                />
                                <label htmlFor={`vehicle_type${index}`} style={{ minHeight: '5rem' }}>
                                    <Img src={`/images/${tab.img}`} alt={tab.label} title={tab.label} />
                                </label>
                            </div>
                        </Col>
                    )
                })}
            </Row>

            { othersForm && othersForm.length !== 0 && (
                <>
                    <Divider/>
                    <Header as="h3" text="Autres types de véhicules"/>
                    <div className="m-2">
                        <Row>
                            { othersForm.map((tab, index) => {
                                return (
                                    <div className="form-check m-0">
                                        <input id={`name_second_${index}`}
                                            type="radio"
                                            name="vehicleType"
                                            value={tab.value}
                                            ref={register}
                                            onChange={() => triggerSubmit()}
                                        />
                                        <label htmlFor={`name_second_${index}`}>{tab.label}</label>
                                    </div>
                                )
                            })}
                        </Row>
                    </div>
                </>
            )}
        </form>
    )
}

export default VehicleTypeSelectorStep
