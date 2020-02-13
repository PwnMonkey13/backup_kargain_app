import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import Loader from '../../components/Loader'
import Link from "next/link";

const Callback = (props) => {
    const router = useRouter();
    const { redirect } = props.router.query;

    useEffect(() => {
        setTimeout(() => {
            router.push(redirect || '/');
        }, 3000);
    }, []);

    return (
        <>
            <Loader fullscreen={false}/>
            <Link href={redirect}>
                <a>Redirection...</a>
            </Link>
        </>
    );
};

export default Callback;
