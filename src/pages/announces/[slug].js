import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import nextCookie from 'next-cookies'
import { useRouter } from 'next/router';
import { Row, Col } from 'reactstrap'
import Layout from '../../layouts/Layout'
import UsersService from '../../services/UsersService'
import { UserContext } from '../../components/Context/UserContext';
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";
import Tabs from "../../components/Tabs/Tabs";
import AnnounceService from "../../services/AnnounceService";

const Announce = ({err, ...props}) => {
    const router = useRouter();
    const [ announce, setAnnounce ] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const pathname = window.location.pathname;
            const slug = pathname.substr(pathname.lastIndexOf('/') + 1);
            const id = slug.substr(slug.lastIndexOf('-') + 1);
            console.log(window.location, slug, id);

            const result = await AnnounceService.getWPAnnounces(id);
            console.log(result);
            return result;
        }

        const result = fetchData();
        setAnnounce(result);
        return ()=>{
            console.log('unmounted')
        }
    }, []);

    return (
            <Layout {...props}>
                <p>zefzefzef</p>
            </Layout>
    );
};

// Announce.getInitialProps = async function (ctx) {
//     let segment;
//     let slug;
//     let id;
//
//     if (ctx.req) {
//         // Server side rendering
//         segment = ctx.req.originalUrl
//     } else {
//         // Client side rendering
//         segment = window.location.hostname
//     }
//
//     slug = segment.substr(segment.lastIndexOf('/') + 1);
//     id = slug.substr(slug.lastIndexOf('-') + 1);
//     console.log(id);
//
//     try {
//         const announce = await AnnounceService.getWPAnnounces(id);
//         console.log(announce);
//         return {announce};
//     } catch (err) {
//         return err;
//     }
// };


export default Announce;
