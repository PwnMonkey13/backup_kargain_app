import React from 'react'
import { Col, Row } from 'reactstrap'
import Header from '../Header'
import { SelectInput } from '../Form/Inputs'
import Divider from '../Divider'

const tabsRadio = [
    {
        value: 'car',
        label: 'Voiture',
        img: 'tab-car.png'
    },
    {
        value: 'moto',
        label: 'Moto',
        img: 'tab-moto.png'
    },
    {
        value: 'scooter',
        label: 'Scooter',
        img: 'motor_scooter.png'
    },
    {
        value: 'utility',
        label: 'Utilitaire',
        img: 'tab-gruz.png'
    },
    {
        value: 'camper',
        label: 'Camping car',
        img: 'tab-camper.png'
    },
    {
        value: 'truck',
        label: 'Camion',
        img: 'tab-gruz.png'
    },
    {
        value: 'bus',
        label: 'Bus',
        img: 'tab-bus.png'
    }
]

const othersFormOptions = []

const VehicleTypeFilterSelector = ({ name, control, rules }) => {
    return (
        <section>
            <Row className="justify-content-center">
                { tabsRadio && tabsRadio.map((tab, index) => {
                    return (
                        <Col key={index} xs={6} sm={4} lg={6}>
                            <div className="form-check no-input form-check-vehicle m-1">
                                <input id={`name_${index}`}
                                    ref={control.register(rules)}
                                    type="radio"
                                    name={name}
                                    value={tab.value}
                                    defaultChecked={tab.checked}
                                />
                                <label className="p-2" htmlFor={`name_${index}`}>
                                    <img
                                        src={`/images/${tab.img}`}
                                        height="30"
                                        width="40"
                                        alt={tab.label}
                                        title={tab.label}
                                    />
                                </label>
                            </div>
                        </Col>
                    )
                })}
            </Row>

            { othersFormOptions && othersFormOptions.length > 0 && (
                <>
                    <Divider/>
                    <Header p text="Autres types de véhicules"/>
                    <SelectInput
                        name={`${name}Select`}
                        options={othersFormOptions}
                        control={control}
                        rules={rules}
                        onChange={([selected]) => {
                            control.setValue(name, null)
                            return selected
                        }}
                    />
                </>
            )}
        </section>
    )
}

export default VehicleTypeFilterSelector
