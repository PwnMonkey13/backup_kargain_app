import React, {useState, useEffect, useContext} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import nextCookie from 'next-cookies'
import {Container} from "reactstrap";
import { set as _set } from 'lodash';
import styled from 'styled-components';
import Layout from "../layouts/Layout";
import model from '../components/form/Models/announce-rental.model';
import FormPanel from '../components/form/FormPanel';
import {UserContext} from '../components/Context/UserContext';
import AnnounceService from '../services/AnnounceService';

const Announce = (props) => {
    const [state, setState] = useState({
        category: "sefsefsef"}
    );
    const {session, dispatch} = useContext(UserContext);
    const router = useRouter();

    console.log(props.token);
    console.log(session);

    const handleSubmit = async (e, data) => {
        const form = Object.entries(data).reduce((res, [path, val]) => {
            _set(res, path, val);
            return res;
        }, {});

        console.log(form);

        AnnounceService.createAnnounce(form, props.token)
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            }
        );
    };

    return (
        <Layout>
            <Container>
                <p> Vous devez être connecté pour créer une annonce </p>
                <p> Sinon vous devez vous connecter et vous serez redirigé inchallah </p>

                <Link href={`auth/login?redirect=${router.asPath}`}>
                    <a className="">Se connecter</a>
                </Link>

                <div className="test">
                    <FormPanel
                        className="form_ad"
                        btnName="Enregistrer"
                        submitCallback={handleSubmit}
                        model={model}
                        value={state}
                    />
                </div>

            </Container>
        </Layout>
    )
};

Announce.getInitialProps = async function (ctx) {
    const {token} = nextCookie(ctx);
    let originalUrl;
    if (ctx.req) {
        // Server side rendering
        originalUrl = ctx.req.get('host') + ctx.req.originalUrl
    } else {
        // Client side rendering
        originalUrl = window.location.hostname + (window.location.port ? ':' + window.location.port : '')
    }
    return {originalUrl, token}
};

export default Announce;
