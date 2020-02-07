import React from "react";
import {Col, FormGroup, Row} from "reactstrap";
import { SelectOptionsGroup, RadioGroup, CheckboxGroup} from './globalFields'
import {
    TelInput,
    FileInput,
    NumberInput,
    TextInput,
    EmailInput,
    RadioInput,
    TextareaInput,
    CheckboxInput,
    SelectInput,
    PasswordInput
} from '../form/Inputs';

import { CheckboxesUtils, SelectOptionsUtils } from '../../libs/formFieldsUtils'
import FieldsTranslalted from '../../../public/locales/fr/fields'

import NiceSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import Tabs from '../../components/Tabs/Tabs';

const animatedComponents = makeAnimated();

export const ManufactureYearSelectGroup = (props) => {
    const title = "Année de fabrication";
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    return(
        <FormGroup>
            <h4> { title } :</h4>
            <NiceSelect
                id="year"
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[options[1], options[2]]}
                isMulti
                options={options}
            />
        </FormGroup>
    )
};

export const PowerInputGroup = ({ setInputs, ...props }) => {
    const title = "Puissance";
    return(
        <FormGroup>
            <h4> { title } :</h4>
            <Row form>
                <Col md={6}>
                    <NumberInput name='kw' placeholder="kW" setInputs={setInputs} />
                </Col>
                <Col md={6}>
                    <NumberInput name='ch' placeholder="CH" setInputs={setInputs} />
                </Col>
            </Row>
        </FormGroup>
    )
};

export const ConsumptionInputGroup = ({ setInputs, ...props }) => {
    const title = "Consommation";
    return(
        <FormGroup>
            <h4> { title } :</h4>
            <NumberInput name="mixt" setInputs={setInputs} />
            <NumberInput name="city" placeholder="Ville" setInputs={setInputs} />
            <NumberInput name="road" placeholder="Route" setInputs={setInputs}/>
        </FormGroup>
    )
};

export const DatePatternSelectOptionsGroup = ({ pattern, $flag }) => {
    if(pattern === "Y M"){
        return(
            <Row>
                <label>Année :</label>
                <YearPicker
                    defaultValue="2010"
                    start={2010}
                    end={2020}
                    reverse
                    required={true}
                    id={'year'}
                    classes={'classes'}
                    optionClasses={'option classes'}
                    value={ $flag.at('year').value }
                    onChange={(year) => {
                        $flag.at('year').set(year);
                    }}
                />
                <label>Mois :</label>
                <MonthPicker
                    endYearGiven
                    required={true}
                    id={'month'}
                    name={'month'}
                    classes={'classes'}
                    optionClasses={'option classes'}
                    value={ $flag.at('month').value }
                    onChange={(month) => {
                        $flag.at('month').set(month);
                    }}
                />
            </Row>
        );
    }
};

export const TechnicalPaperTabGroup = (props) => {
    return(
        <Tabs active={props.active}>
            <div title="Extérieur">
                <img src="images/exter.jpg" alt=""/>
            </div>
            <div title="Cycle">
                <img src="images/cycle.jpg" alt="" />
            </div>
            <div title="Intérieur">
                <img src="images/interer.jpg" alt="" />
            </div>
        </Tabs>
    )
};
