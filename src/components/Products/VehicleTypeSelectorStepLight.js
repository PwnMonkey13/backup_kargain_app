import React, { useContext , useRef, memo } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import useDimensions from 'react-use-dimensions';
import { FormContext } from '../../context/FormContext';

const vehicleTypes = [
    {
        value: 'car',
        label: 'Voiture'
    },
    {
        value: 'moto',
        label: 'Moto'
    },
    {
        value: 'utility',
        label: 'Utilitaire'

    },
    {
        value: 'camper',
        label: 'Camping car'
    }
];

const VehicleTypeSelectorStepLight = ({ handleSelectVehicleType }) => {
    const formRef = useRef(null);
    const [refWidth, { width }] = useDimensions();
    const { dispatchFormUpdate } = useContext(FormContext);
    const { register, handleSubmit } = useForm({
        defaultValues : {
            vehicleType : vehicleTypes[0].value
        }
    });

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
    };

    const handleClick = (index) => {
        const vehicleType = vehicleTypes[index].value;
        handleSelectVehicleType(vehicleType);
        triggerSubmit();
    };

    const onSubmit = (data) => {
        dispatchFormUpdate({
            vehicleType: data.vehicleType
        });
        handleSelectVehicleType(data.vehicleType);
    };

    return (
        <form className="my-1" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="refWidth" ref={refWidth}>
                <Row className="justify-content-center">
                    {vehicleTypes && vehicleTypes.map((tab, index) => {
                        return (
                            <Col key={index} xs={6} sm={6} md={width < 500 ? 12 : 3} lg={width < 500 ?  6 : 3}>
                                <div className="form-check form-check-vehicle m-0">
                                    <input id={`vehicle_type${index}`}
                                        type="radio"
                                        name="vehicleType"
                                        value={tab.value}
                                        ref={register}
                                        onChange={() => handleClick(index)}
                                    />
                                    <label htmlFor={`vehicle_type${index}`}>
                                        {tab.label}
                                    </label>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </form>
    );
};

export default memo(VehicleTypeSelectorStepLight);
