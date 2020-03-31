import React from "react";
import {Col, Row} from "reactstrap";

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

const VehicleTypeSelector = ({name, control, getVehicleType, ...props}) => {

    const onChangeSelect = (e) => {
        const type = e.target.value;
        getVehicleType(type);
    };

    return(
        <Row className="justify-content-center">
            { tabsRadio && tabsRadio.map((tab, index) => {
                return (
                    <div key={index} className="form-check no-input form-check-vehicle m-1">
                        <input id={`name_${index}`}
                               type="radio"
                               name={name}
                               value={tab.value}
                               ref={control.register}
                               onChange={onChangeSelect}
                        />
                        <label className="p-2" htmlFor={`name_${index}`}>
                            <img
                                src={`/images/${tab.img}`}
                                height="30"
                                width="40"
                                alt={tab.label}
                            />
                        </label>
                    </div>
                )
            })}
        </Row>
    )
};

export default VehicleTypeSelector;
