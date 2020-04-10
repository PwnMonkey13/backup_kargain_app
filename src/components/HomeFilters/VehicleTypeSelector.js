import React, {useRef, useEffect } from "react";
import {Col, Row} from "reactstrap";
import Header from "../Header";
import {SelectInput} from "../Form/Inputs";
import Divider from "../Divider";
import styled from 'styled-components';

const tabsRadio = [
    {
        value : 'car',
        label : 'Voiture',
        img : 'tab-car.png'
    },
    {
        value : 'moto',
        label : 'Moto',
        img : 'tab-moto.png'
    },
    {
        value : 'scooter',
        label : 'Scooter',
        img : 'motor_scooter.png'
    },
    {
        value : 'utility',
        label : 'Utilitaire',
        img : 'tab-gruz.png'
    }
];

const othersFormOptions = [
    {
        value : 'bus',
        label : 'Bus',
    },
    {
        value : 'truck',
        label : 'Camion',
    },
    {
        value : 'camper',
        label : 'Camping car',
    },
];

const Div = styled.div`
    border : 1px solid gainsboro;
    padding : .5rem 1rem
`;

const VehicleTypeSelector = ({name, control, rules, ...props}) => {
    const radioRef = useRef();

    useEffect(() => {
        control.register(name, rules);
    },[]);

    return(
        <div>
            <Row className="justify-content-center">
                { tabsRadio && tabsRadio.map((tab, index) => {
                    return (
                        <div key={index} className="form-check no-input form-check-vehicle m-1">

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
                    )
                })}
            </Row>

            <Divider/>

            { othersFormOptions && (
                <>
                    <Header p text="Autres types de véhicules"/>
                    <SelectInput
                        name={`${name}Select`}
                        options={othersFormOptions}
                        control={control}
                        rules={rules}
                        onChange={([selected]) => {
                            control.setValue(name, null);
                            return selected;
                        }}
                    />
                </>
            )}
        </div>
    )
};

export default VehicleTypeSelector;
