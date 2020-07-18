import React, { useContext,  useState } from 'react';
import { Col, Row } from 'reactstrap';

import useDimensions from 'react-use-dimensions';
import { useForm } from 'react-hook-form';
import Header from '../Header';
import Divider from '../Divider';
import { FormContext } from '../../context/FormContext';

const tabsRadio = [
    {
        value: 'car',
        label: 'Voiture',
        img: 'tab-car.png',
        imgSelected: 'tab-car-blue.png'
    },
    {
        value: 'moto',
        label: 'Moto',
        img: 'tab-moto.png',
        imgSelected: 'tab-moto-blue.png'
    },
    {
        value: 'utility',
        label: 'Utilitaire',
        img: 'tab-gruz.png',
        imgSelected: 'tab-gruz-blue.png'

    },
    {
        value: 'camper',
        label: 'Camping car',
        img: 'tab-camper.png',
        imgSelected: 'tab-camper-blue.png'
    }
];

const VehicleTypeSelectorStep = ({ handleSelectVehicleType }) => {
    const [formRef, { width }] = useDimensions();
    const { register, handleSubmit } = useForm();
    const { dispatchFormUpdate } = useContext(FormContext);
    const [type, setType] = useState(null);
    const othersForm = [];

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
    };

    const handleClick = (index) => {
        const type = tabsRadio[index].value;
        setType(type);
        handleSelectVehicleType(type);
        triggerSubmit();
    };

    const onSubmit = (data) => {
        dispatchFormUpdate({
            vehicleType: data.vehicleType
        });
        handleSelectVehicleType(data.vehicleType);
    };

    return (
        <form className="form_wizard my-4" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-center">
                {tabsRadio && tabsRadio.map((tab, index) => {
                    return (
                        <Col key={index} xs={6} sm={6} md={width < 500 ? 12 : 3} lg={3}>
                            <div className="form-check form-check-vehicle m-0" style={{ minHeight: '5rem' }}>
                                <input id={`vehicle_type${index}`}
                                    type="radio"
                                    name="vehicleType"
                                    value={tab.value}
                                    ref={register}
                                    onChange={() => handleClick(index)}
                                />
                                <label htmlFor={`vehicle_type${index}`} style={{ minHeight: '5rem' }}>
                                    <img src={type === tab.value ? `/images/${tab.imgSelected}` : `/images/${tab.img}`}
                                        alt={tab.label}
                                        title={tab.label}
                                        style={{maxWidth:'80px', objectFit: 'contain' }}
                                    />
                                </label>
                            </div>
                        </Col>
                    );
                })}
            </Row>

            {othersForm && othersForm.length !== 0 && (
                <>
                    <Divider/>
                    <Header as="h3" text="Autres types de véhicules"/>
                    <div className="m-2">
                        <Row>
                            {othersForm.map((tab, index) => {
                                return (
                                    <div key={index} className="form-check m-0">
                                        <input id={`name_second_${index}`}
                                            type="radio"
                                            name="vehicleType"
                                            value={tab.value}
                                            ref={register}
                                            onChange={() => triggerSubmit()}
                                        />
                                        <label htmlFor={`name_second_${index}`}>{tab.label}</label>
                                    </div>
                                );
                            })}
                        </Row>
                    </div>
                </>
            )}
        </form>
    );
};

export default VehicleTypeSelectorStep;
