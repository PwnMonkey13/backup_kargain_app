import React, {useState, useEffect, useContext} from "react";
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import model from '../components/form/Models/announce-rental.model';
import FormPanel from '../components/form/FormPanel';
import {ModalDialogContext} from "../components/Context/ModalDialogContext";
import ActiveLink from "../components/ActiveLink";
import AnnounceService from '../services/AnnounceService';
import AnnounceResume from "../components/AnnounceResume";
import {useRouter} from "next/router";

const Announce = (props) => {
    const router = useRouter();
    const {dispatchModal} = useContext(ModalDialogContext);
    const [announce, setAnnounce] = useState({});
    const [displayFormResume, setDisplayFormResume] = useState(false);
    const [ createdAnnounceLink, setCreatedAnnounceLink] = useState(null);
    const handleSubmit = async (e, data) => {
        setAnnounce(data);
        // setDisplayFormResume(true);
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                setCreatedAnnounceLink(`/announces/${doc.slug}`);
                dispatchModal({type : 'success', msg : 'Announce created successufully', link : createdAnnounceLink  });
            }).catch(err => {
            dispatchModal({type : 'error', err });
            }
        );
    };

    const FormResume = () => {
        return(
            <>
                <AnnounceResume announce={announce}/>
                <button onClick={() => confirmSubmit}>Valider</button>
            </>
        )
    };

    return (
        <Row>
            <Col md={12}>
                <FormPanel
                    className="form_ad"
                    btnName="Enregistrer"
                    submitCallback={handleSubmit}
                    model={model}
                />
                {createdAnnounceLink && <ActiveLink href={createdAnnounceLink}>
                   Voir l'annonce
                </ActiveLink>
                }
            </Col>
            {/*<Col md={4} className="d-flex justify-content-end m-0">*/}
            {/*    <div className="announce position-fixed">*/}
            {/*        { displayFormResume && <FormResume />}*/}
            {/*    </div>*/}
            {/*</Col>*/}
        </Row>
    )
};

Announce.getInitialProps = function() {
    return {
        requiredAuth : true,
        fluid : true
    };
};

export default Announce;
