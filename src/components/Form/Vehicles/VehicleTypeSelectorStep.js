import React, { useRef, useContext} from "react";
import Router, { withRouter } from 'next/router';
import styled from 'styled-components';
import {Col, Row} from "reactstrap";
import {useForm } from "react-hook-form";
import {FormContext} from '../../Context/FormContext';

const VehicleTypeSelectorStep = ({handleSelectType, formConfig, prevStep, nextStep, ...props}) => {
    const { router } = props;
    const formRef = useRef(null);
    const { register, handleSubmit} = useForm(formConfig);
    const {dispatchFormUpdate} = useContext(FormContext);

    const tabsRadio = [
        {
            value : 'car',
            img : 'tab-car.png'
        },
        {
            name : 'moto',
            img : 'tab-moto.png'
        },
        {
            name : 'bus',
            img : 'tab-bus.png'
        },
        {
            name : 'utility',
            img : 'tab-gruz.png'
        }
    ];

    const onSubmit = (data) => {
        dispatchFormUpdate(data);
        handleSelectType(data.vehicleType);
    };

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'))
    };

    const VehicleChoice = styled.label`
        margin : 0;
        min-height:4rem;
        display:flex;
    `;

    return(
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                { tabsRadio && tabsRadio.map((tab, index) => {
                    return (
                        <Col key={index} md={3} className="ml-auto">
                            <div className="form-check form-check-vehicle m-0">
                                <input id={`name_${index}`}
                                       type="radio"
                                        name="vehicleType"
                                        value={tab.value}
                                        ref={register}
                                        onChange={() => triggerSubmit()}
                                />
                                <label htmlFor={`name_${index}`} style={{minHeight:'5rem'}}>
                                    <img src={`/images/${tab.img}`} alt=""/>
                                </label>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </form>
    )
};

export default withRouter(VehicleTypeSelectorStep);
