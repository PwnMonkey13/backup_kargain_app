import React, { useContext, useEffect } from "react";
import Link from 'next/link'
import { Container } from 'reactstrap';
import  { withRouter } from 'next/router'
import {FormContext} from "../../components/Context/FormContext";

const Page = (props) => {
    const { router } = props;
    const {dispatchFormClear} = useContext(FormContext);

    useEffect(()=> {
        dispatchFormClear();
    },[]);

    return (
        <Container>
            <h1 className="cbm-title--page">Vendre sa voiture</h1>
            <Link href={`${router.pathname}/form`}>
                <a className="btn btn-outline-dark">Accéder au formulaire Kargain</a>
            </Link>
            <SectionEngagemnts/>
        </Container>
    )
};

const SectionEngagemnts = () => {
    return (
        <section className="cbm-section--bottom">
            <h2 className="cbm-title--section">
                Nos engagements <i className="cbm-sprite--partnersLC"/>
            </h2>

            <dl>
                <dt>
                    <i className="cbm-sprite--shieldBlue"/><br/>Bouclier anti-fraude La Centrale
                </dt>
                <dd className="cbm-shortCommitment">
                    Données personnelles 100% protégées : vos nom, adresse et email ne
                    sont jamais affichés sur le site. Votre numéro de téléphone est remplacé par un numéro Sécuritel qui
                    redirige les appels sur votre téléphone.
                </dd>
                <dt>
                    <i className="cbm-sprite--dealBlue"/><br/>Expertise
                </dt>
                <dd className="cbm-shortCommitment">
                    <strong>Annonces enrichies</strong> : les données techniques
                    (consommation, chevaux, dimensions...) de votre véhicule et un rapport de son historique (changement
                    de propriétaires, contrôles techniques) seront automatiquement ajoutés à votre annonce.
                </dd>
                <dt>
                    <i className="cbm-sprite--expertiseBlue"/><br/>Forfait tout inclus
                </dt>
                <dd className="cbm-shortCommitment">
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
