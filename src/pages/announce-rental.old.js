import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { Row, Col, Form, FormGroup, Label, InputGroup } from 'reactstrap'
import { useLink } from 'valuelink'
import { Input } from "linked-controls";
import NiceSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

import { CheckboxesUtils, SelectOptionsUtils } from '../libs/FormGroupsUtils'
import FieldsTranslalted from '../../public/locales/fr/fields'
import InputControlled from '../components/form/InputControlled';
import Tabs from '../components/Tabs/Tabs';

const animatedComponents = makeAnimated();

const RadioGroupType = ({$flag}) => {
    const fields = [
        {
            'label': 'Citadine',
            'value': 'citadine',
        },
        {
            'label': 'Cabriolet',
            'value': 'convertible'
        },
        {
            'label': 'Coupé',
            'value': 'cupcar'
        },
        {
            'label': 'SUV/4x4\n',
            'value': 'suv'
        },
        {
            'label': 'Berline',
            'value': 'sedan'
        },
        {
            'label': 'Break',
            'value': 'break'
        },
        {
            'label': 'Monospace',
            'value': 'minivan'
        },
        {
            'label': 'Autre',
            'value': 'other'
        }
    ];
    const title = 'Catégorie';
    return <RadioGroup title={title} fields={fields} $flag={$flag} />
};

const RadioGroupGasoline = ({$flag}) => {
    const fields = [
        {
            'label': 'Diesel',
            'value': 'diesel',
        },
        {
            'label': 'Essence',
            'value': 'gas'
        },
        {
            'label': 'Éthanol',
            'value': 'ethanol'
        },
        {
            'label': 'Electrique',
            'value': 'eletric'
        },
        {
            'label': 'Hybride diesel',
            'value': 'hybride-gas'
        },
        {
            'label': 'Hydrogène',
            'value': 'hydrogen'
        },
        {
            'label': 'Monospace',
            'value': 'minivan'
        },
        {
            'label': 'Gaz compressé (GPL)',
            'value': 'gpl'
        }
    ];
    const title = 'Carburant';
    return <RadioGroup title={title} fields={fields} $flag={$flag} />
};

const RadioGroupEngine = ({$flag}) => {
    const fields = [
        {
            'label': 'Automatique',
            'value': 'automatic',
        },
        {
            'label': 'Manuelle',
            'value': 'manual'
        },
        {
            'label': 'Semi-automatique',
            'value': 'semi-auto'
        },
    ];
    const title = 'Boite de vitesse';
    return <RadioGroup title={title} fields={fields} $flag={$flag} />
};

const RadioGroupEmission = ({$flag}) => {
    const fields = [
        {
            'label': 'EURO1',
            'value': 'euro1',
        },
        {
            'label': 'EURO2',
            'value': 'euro2'
        },
        {
            'label': 'EURO3',
            'value': 'euro3'
        },
        {
            'label': 'EURO4',
            'value': 'euro4'
        },
        {
            'label': 'EURO5',
            'value': 'euro5'
        },
        {
            'label': 'EURO6',
            'value': 'euro6'
        }
    ];
    const title = "Classe d'émission";
    return <RadioGroup title={title} fields={fields} $flag={$flag} />
};

const RadioGroupExternalColor = ({$flag}) => {
    const fields = FieldsTranslalted.externalColors;
    const title = "Couleur extérieure";
    return <RadioGroup title={title} fields={fields} $flag={$flag} />
};

const RadioGroupIntenalColor = ({$flag}) => {
    const fields = FieldsTranslalted.externalColors;
    const title = "Couleur intérieure";
    return <RadioGroup title={title} fields={fields} $flag={$flag} />
};

const RadioGroupPaint = ({$flag}) => {
    const title = "Peinture";
    const fields = FieldsTranslalted.paints;
    return <RadioGroup title={title} fields={fields} $flag={$flag} />
};

const CheckboxGroupEquipements = ({$flag}) => {
    const title = "Equipements";
    return <CheckboxGroup title={title} $flag={$flag} />
};

const CheckboxGroupMaterials = ({$flag}) => {
    const title = "Matériaux";
    return <CheckboxGroup title={title} $flag={$flag} />
};

const SelectGroupDoors = ({$flag}) => {
    const title = "Nombre de portes";
    const fields = SelectOptionsUtils([ 2, 3, 4, 5]);
    return <SelectOptionsGroup title={title} fields={fields} $flag={$flag} />
};

const SelectGroupSeats = ({$flag}) => {
    const title = "Nombre de places";
    const fields = SelectOptionsUtils([2, 3, 4, 5]);
    return <SelectOptionsGroup title={title} fields={fields} $flag={$flag} />
};

const ManufactureYearSelectGroup = ({pattern, $flag}) => {
    const title = "Année de fabrication";
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    return(
        <FormGroup>
            <h4> { title } :</h4>
            {/*<DatePatternSelectOptionsGroup pattern={pattern} $flag={$flag} />*/}
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

const PriceInputGroup = ({ $flag }) => {
    const title = "Prix";
    return(
        <FormGroup>
            <h4> { title } :</h4>
            <Row form>
                <Col md={6}>
                    <InputControlled label="Prix par jour" type="number" $flag={$flag.at('ppd')} placeholder="TTC"/>
                </Col>
                <Col md={6}>
                    <InputControlled label="Prix par heure" type="number" $flag={$flag.at('pph')} placeholder="TTC"/>
                </Col>
            </Row>
        </FormGroup>
    )
};

const PowerInputGroup = ({ $flag }) => {
    const title = "Puissance";
    return(
        <FormGroup>
            <h4> { title } :</h4>
            <Row form>
                <Col md={6}>
                    <InputControlled type="number" $flag={$flag.at('kw')} placeholder="kW"/>
                </Col>
                <Col md={6}>
                    <InputControlled type="number" $flag={$flag.at('ch')} placeholder="CH"/>
                </Col>
            </Row>
        </FormGroup>
    )
};

const CylinderInputGroup = ({ $flag }) => {
    const title = "Cylindrée";
    return(
        <FormGroup>
            <h4> { title } :</h4>
            <Row form>
                <Col md={6}>
                    <InputControlled type="number" $flag={$flag} placeholder="kW"/>
                </Col>
            </Row>
        </FormGroup>
    )
};

const ConsumptionInputGroup = ({ $flag }) => {
    const title = "Consommation";
    return(
        <FormGroup>
            <h4> { title } :</h4>
            <InputControlled type="number" $flag={$flag.at('mixt')} placeholder="Mixte"/>
            <InputControlled type="number" $flag={$flag.at('city')} placeholder="Ville"/>
            <InputControlled type="number" $flag={$flag.at('road')} placeholder="Route"/>
        </FormGroup>
    )
};

const SellerInputGroup = ({ $flag }) => {
    const title = "Données du vendeur";
    const countries = [
        { value: 'france', label: 'France' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];
    return(
        <FormGroup>
            <Row form>
                <Col md={4}>
                    <SelectOptionsGroup title="Pays" fields={countries} $flag={$flag.at('country')} />
                </Col>
                <Col md={4}>
                    <InputControlled label="Ville ou code postal" type="text" $flag={$flag.at('postalcode')} />
                </Col>
                <Col md={4}>
                    <InputControlled label="Numéro de téléphone" type="tel" $flag={$flag.at('phone')} />
                </Col>
            </Row>
        </FormGroup>
    )
};

const VINInputGroup = ({ $flag }) => {
    const title = "Numéro de chassis";
    return(
        <FormGroup>
            <h4> { title } :</h4>
            <InputControlled type="text" $flag={$flag} placeholder="VIN"/>
        </FormGroup>
    )
};

const RadioGroupVehicleState = ({$flag}) => {
    const fields = FieldsTranslalted.vehicleState;
    const title = "Etat général";
    return <RadioGroup title={title} fields={fields} $flag={$flag} />
};

const DatePatternSelectOptionsGroup = ({ pattern, $flag }) => {
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

const DescriptionTextAreaGroup = ({ $flag }) => {
    const placeholder = FieldsTranslalted.textarea;
    const title = "Description";
    return (
        <FormGroup>
            <h4> { title } :</h4>
            <InputControlled type="textarea" $flag={$flag} placeholder={placeholder}/>
        </FormGroup>
    )
};

const TechnicalPaperTabGroup = ({ $flag }) => {
 return(
     <Tabs active={$flag.at('active').value}>
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

const SelectOptionsGroup = ({ title, fields, $flag }) => {
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

const RadioGroup = ({ title, fields, $flag }) => {
    return (
        <FormGroup>
            <h4> { title } :</h4>
            <Row>
                {fields.map((field, key) => {
                    return(
                        <Col key={key} md={4}>
                            <InputGroup className="field_inline">
                                <Input type="radio" $checked={ $flag.equals(field.value)}  />
                                <Label>{field.label}</Label>
                            </InputGroup>
                        </Col>
                    )
                })}
            </Row>
        </FormGroup>
    );
};

const CheckboxGroup = ({ title, $flag }) => {
    // const flag$ = $flag.pick();
    return (
        <FormGroup>
            <h4> { title } :</h4>
            <Row>
                { $flag.map( ( $item, index ) => {
                    const item = $item.value;
                    // console.log($item.at( 'checked' ).props);
                    // checked={$item.at( 'checked' ).props.checked}
                    // onChange={ e => {
                    //     console.log(e.target.checked);
                    //     // if($item.at( 'checked' ).value == null) $item.at( 'checked' ).set(false);
                    //     $item.at( 'checked' ).set( e.target.checked )
                    // } }
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

const SaveBtn = () => {
    return(
        <div className="btn-anonce-wrapper">
            <button type="submit" className="btn btn-outline-primary btn-enreg">Enregistrer</button>
            <button type="submit" className="btn btn-primary btn-publier">Publier</button>
        </div>
    )
};

const Announce = () => {
    const $state = useLink({
        type: '',
        manufacturer: {
            make : null,
            model: null,
            version : null
        },
        manufactureDate: {
            year : 2010,
            month : '08'
        },
        price: {
            activePerHour : false,
            ppd: 0,
            pph : 0
        },
        power : {
           kw : 0,
           ch : 0
        },
        gas: '',
        cylinder: 0,
        engine : '',
        emission : '',
        consumption : {
            mixt : 0,
            city : 0,
            road : 0,
        },
        equipements : CheckboxesUtils(FieldsTranslalted.equipements, ['soundsystem', 'bluetooth']),
        externalColor : '',
        internalColor : '',
        paint : '',
        doors : 3,
        materials : SelectOptionsUtils(FieldsTranslalted.materials),
        seats : 5,
        vin : '',
        vehicleState : '',
        description : '',
        tags : [],
        technicalPapers : {
            active : 0
        },
        seller: {
            country : '',
            city: '',
            postalcode : '',
            phone : ''
        }
    });
    console.log($state.at( 'technicalPapers' ));
    return (
        <Layout>
            <Form className="form_ad">
                <h3 className="big-mt">Données du véhicule :</h3>
                <RadioGroupType $flag={ $state.at('type') } />
                <ManufactureYearSelectGroup pattern={'Y M'} $flag={ $state.at('manufactureDate') } />
                <PriceInputGroup $flag={$state.at('price')} />
                <RadioGroupGasoline $flag={ $state.at('gas') } />
                <PowerInputGroup $flag={$state.at('power')} />
                <CylinderInputGroup $flag={$state.at('cylinder')} />
                <RadioGroupEngine $flag={ $state.at('engine') } />
                <RadioGroupEmission $flag={ $state.at('emission') } />
                <ConsumptionInputGroup $flag={ $state.at('consumption') } />
                <CheckboxGroupEquipements $flag={ $state.at('equipements') } />
                <RadioGroupExternalColor $flag={ $state.at('externalColor') } />
                <RadioGroupPaint $flag={ $state.at('paint') } />
                <SelectGroupDoors $flag={ $state.at('doors') } />
                <RadioGroupIntenalColor $flag={ $state.at('internalColor') } />
                <CheckboxGroupMaterials $flag={ $state.at('materials') } />
                <SelectGroupSeats $flag={ $state.at('seats') } />

                <h3 className="big-mt">Etat du véhicule :</h3>
                <VINInputGroup $flag={$state.at('vin')} />
                <RadioGroupVehicleState $flag={ $state.at('vehicleState') } />
                <DescriptionTextAreaGroup $flag={$state.at('description')} />

                <h3 className="big-mt">Tags</h3>

                <h3 className="big-mt">Fiches techniques</h3>
                <TechnicalPaperTabGroup $flag={$state.at('technicalPapers')} />

                <h3 className="big-mt">Données du vendeur</h3>
                <SellerInputGroup $flag={$state.at('seller')} />

                <SaveBtn/>
            </Form>
        </Layout>
    )
};

export default Announce;
