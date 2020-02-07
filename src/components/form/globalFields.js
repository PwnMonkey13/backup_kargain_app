import {Col, FormGroup, InputGroup, Label, Row} from "reactstrap";
import React from "react";
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import NiceSelect from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export const SelectOptionsGroup = ({ title, fields, $flag }) => {
    return (
        <FormGroup>
            <h4> { title } :</h4>
            <NiceSelect
                id="year"
                // closeMenuOnSelect={false}
                components={animatedComponents}
                // defaultValue={[options[1], options[2]]}
                // isMulti
                options={fields}
                value={ $flag.value }
                onChange={(value) => {
                    $flag.set(value);
                }} />
        </FormGroup>
    );
};

export const RadioGroup = ({ title, fields, $flag }) => {
    return (
        <FormGroup>
            <h4> { title } :</h4>
            <Row>
                {fields.map((field, key) => {
                    return(
                        <Col key={key} md={4}>
                            <InputGroup className="field_inline">
                                <input type="radio" checked={ $flag.equals(field.value)}  />
                                <Label>{field.label}</Label>
                            </InputGroup>
                        </Col>
                    )
                })}
            </Row>
        </FormGroup>
    );
};

export const CheckboxGroup = ({ title, $flag }) => {
    // const flag$ = $flag.pick();
    return (
        <FormGroup>
            <h4> { title } :</h4>
            <Row>
                { $flag.map( ( $item, index ) => {
                    const item = $item.value;
                    return(
                        <Col key={index} md={4}>
                            <InputGroup className="field_inline">
                                <input className="toggle" type="checkbox" { ...$item.at( 'checked' ).props } />
                                <Label>{item.label}</Label>
                            </InputGroup>
                        </Col>
                    )
                } ) }
            </Row>
        </FormGroup>
    );
};
