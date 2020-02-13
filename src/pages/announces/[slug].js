import React  from 'react'
import Link from 'next/link'
import nextCookie from 'next-cookies'
import { useRouter } from 'next/router';
import AnnounceService from "../../services/AnnounceService";
import AnnounceCard from "../../components/AnnounceCard";

const Announce = ({announce}) => {

    return (
        <AnnounceCard announce={announce}/>
    );
};

Announce.getInitialProps = async function ({query}) {
    const { slug } = query;
    try {
        const announce = await AnnounceService.getAnnounceBySlug(slug);
        return {announce};
    } catch (err) {
        return {err};
    }
};


export default Announce;
