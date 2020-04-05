import React, {useContext, useEffect, useState} from "react";
import { Container } from 'reactstrap';
import  { withRouter } from 'next/router'
import Header from "../../components/Header";
import { Shield, CheckCircle, FileText } from 'react-feather';
import {FormContext} from "../../components/Context/FormContext";
import VehicleTypeSelectorStep from "../../components/Vehicles/VehicleTypeSelectorStep";

const path = require('path');

const Page = (props) => {
    const { router } = props;
    const [ vehicleType, setVehicleType ] = useState(null);
    const {dispatchFormClear} = useContext(FormContext);

    useEffect(()=> {
        dispatchFormClear();
    },[]);

    const handleSelectType = (type) => {
        setVehicleType(type);
    };

    if(vehicleType) router.push(path.resolve(router.route, vehicleType.toLowerCase()));

    return (
        <Container fluid className="annonce1-wrapper-container">
            <Header as="h1">Vendez votre véhicule</Header>
            <VehicleTypeSelectorStep handleSelectType={handleSelectType}/>
            <SectionEngagemnts/>
        </Container>
    )
};

const SectionEngagemnts = () => {
    return (
        <section className="my-4">
            <h2>
                Les engagements Kargain
            </h2>

            <dl>
                <dt>
                    <Shield /> Bouclier anti-fraude La Centrale
                </dt>
                <dd>
                    Données personnelles 100% protégées : vos nom, adresse et email ne
                    sont jamais affichés sur le site. Votre numéro de téléphone est remplacé par un numéro Sécuritel qui
                    redirige les appels sur votre téléphone.
                </dd>
                <dt>
                    <CheckCircle/> Expertise
                </dt>
                <dd>
                    <strong>Annonces enrichies</strong> : les données techniques
                    (consommation, chevaux, dimensions...) de votre véhicule et un rapport de son historique (changement
                    de propriétaires, contrôles techniques) seront automatiquement ajoutés à votre annonce.
                </dd>
                <dt>
                    <FileText/> Forfait tout inclus
                </dt>
                <dd>
                    <strong>Tout est compris dans le forfait</strong> : publication de
                    votre annonce jusqu'à la vente*, modifications gratuites et illimitées, jusqu'à 50 photos sur votre
                    annonce, protection de votre numéro de téléphone
                    (Sécuritel).<br/>
                    <strong>Gratuit</strong> pour <strong>tous les véhicules</strong>
                    <div className="cbm-nota">A renouveler gratuitement tous les 30 jours, pour confirmer que votre
                        véhicule est toujours à vendre.
                    </div>
                </dd>
            </dl>
        </section>
    );
};

export default withRouter(Page);
