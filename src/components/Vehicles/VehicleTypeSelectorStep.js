import React, { useRef, useContext} from "react";
import {Col, Row} from "reactstrap";
import {useForm } from "react-hook-form";
import {FormContext} from "../Context/FormContext";
import Header from "../Header";

const VehicleTypeSelectorStep = ({handleSelectType, ...props}) => {
    const formRef = useRef(null);
    const {register, handleSubmit} = useForm();
    const {dispatchFormUpdate} = useContext(FormContext);

    const tabsRadio = [
        {
            value : 'car',
            label : 'Voiture',
            img : 'tab-car.png'
        },
        {
            value : 'moto',
            label : 'Moto/Scooter',
            img : 'tab-moto.png'
        },
        {
            value : 'bus',
            label : 'Bus/Camion',
            img : 'tab-bus.png'
        },
        {
            value : 'utility',
            label : 'Utilitaire',
            img : 'tab-gruz.png'
        }
    ];

    const othersForm = [
        {
            value : 'camper',
            label : 'Camping car',
            img : 'tab-gruz.png'
        }
    ];

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'))
    };

    const onSubmit = (data) => {
        const tab = tabsRadio.find(tab => tab.value === data.vehicleType);
        dispatchFormUpdate( {"vehicleType" : { value : tab.value, label : tab.label} });
        handleSelectType(data.vehicleType);
    };

    return(
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                { tabsRadio && tabsRadio.map((tab, index) => {
                    return (
                        <Col key={index} md={3} className="ml-auto">
                            <div className="form-check form-check-vehicle m-0" style={{minHeight : '5rem'}}>
                                <input id={`name_${index}`}
                                       type="radio"
                                        name="vehicleType"
                                        value={tab.value}
                                        ref={register}
                                        onChange={() => triggerSubmit()}
                                />
                                <label htmlFor={`name_${index}`} style={{minHeight:'5rem'}}>
                                    <img
                                        src={`/images/${tab.img}`}
                                        alt={tab.label}
                                        title={tab.label}
                                    />
                                </label>
                            </div>
                        </Col>
                    )
                })}
            </Row>

            { othersForm && (
                <div>
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
                </div>
            )}
        </form>
    )
};

export default VehicleTypeSelectorStep;
