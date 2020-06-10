import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Link from 'next/link';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SecurityIcon from '@material-ui/icons/Security';
import Header from '../components/Header';
import VehicleTypeSelectorStep from '../components/Vehicles/VehicleTypeSelectorStep';

const BgTop = () => {
    const small = 'https://static.carizy.com/images/Main/Mobile/acheter-et-vendre-ma-voiture-occasion-320x630.jpg?v4.2.22';
    const medium = 'https://static.carizy.com/images/Main/Mobile/acheter-et-vendre-ma-voiture-occasion-450x850.jpg?v4.2.22';
    const laptop = 'https://static.carizy.com/images/Main/Tablette/acheter-et-vendre-ma-voiture-occasion-784x1180.jpg?v4.2.22';
    const large = 'https://static.carizy.com/images/Main/Desktop/acheter-et-vendre-ma-voiture-occasion-1171x900.jpg?v4.2.22';
    const xlarge = 'https://static.carizy.com/images/Main/Desktop/acheter-et-vendre-ma-voiture-occasion-1900x1028.jpg?v4.2.22';

    const [currentSrc, setCurrentSrc] = useState('');
    const onLoad = (e) => {
        setCurrentSrc(e.target.currentSrc);
    };

    return (
        <div className="position-relative">
            <div className="position-absolute img-container">
                <img alt="kargain"
                     src={small}
                     srcSet={`${small} 300w, ${medium} 768w, ${laptop} 968w, ${large} 1280w, ${xlarge} 3200w`}
                     onLoad={onLoad}
                />
            </div>
        </div>
    );
};

const SwitchVehicles = () => {
    const [vehicleType, setVehicleType] = useState(null);
    const handleSelectType = (type) => {
        setVehicleType(type);
    };
    return <VehicleTypeSelectorStep handleSelectType={handleSelectType}/>;
};

const SectionEngagemnts = () => {
    return (
        <section className="my-4">
            <h2>
                Les engagements Kargain
            </h2>

            <dl>
                <dt>
                    <SecurityIcon/> Bouclier anti-fraude La Centrale
                </dt>
                <dd>
                    Données personnelles 100% protégées : vos nom, adresse et email ne
                    sont jamais affichés sur le site. Votre numéro de téléphone est remplacé par un numéro Sécuritel qui
                    redirige les appels sur votre téléphone.
                </dd>
                <dt>
                    <CheckCircleOutlineIcon/> Expertise
                </dt>
                <dd>
                    <strong>Annonces enrichies</strong> : les données techniques
                    (consommation, chevaux, dimensions...) de votre véhicule et un rapport de son historique (changement
                    de propriétaires, contrôles techniques) seront automatiquement ajoutés à votre annonce.
                </dd>
                <dt>
                    <TextFieldsIcon/> Forfait tout inclus
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

const Temp = () => {
    return (
        <>
            <BgTop/>
            <Container>
                <div className="position-relative">
                    <Header as="h2" white text="Acheter une voiture de qualité, au meilleur prix !"/>
                    <Header as="h3" white text="N°1 de la vente sécurisée entre particuliers !"/>
                    <Row>
                        <Col>
                            <Header as="h3" white>Voitures inspectées</Header>
                        </Col>
                        <Col>
                            <Header as="h3" white>Paiement sécurisé</Header>
                        </Col>
                        <Col>
                            <Header as="h3" white>Garantie 6 mois offerte</Header>
                        </Col>
                        <Col>
                            <Header as="h3" white>Gestion des formalités</Header>
                        </Col>
                    </Row>
                    <SwitchVehicles/>
                    <p>
                        Voitures inspectées Paiement sécurisé Garantie 6 mois offerte Gestion des formalités
                    </p>
                    <SectionEngagemnts/>
                    <Row>
                        <Header as="h3" text="Nos dernières voitures d'occasion mises en ligne"/>
                        <Link href="/announces">
                            <a className="btn btn-primary"> nos voitures d'occasion</a>
                        </Link>
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default Temp;
