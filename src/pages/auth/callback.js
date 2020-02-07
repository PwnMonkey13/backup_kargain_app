import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'
import Layout from "../../layouts/Layout";
import {UserContext} from "../../components/Context/UserContext";

const Callback = (props) => {
    const router = useRouter();
    const { session } = useContext(UserContext);
    const redirectTo = session.redirectTo || '/';

    useEffect(() => {
        setTimeout(()=>{
            router.push(props.redirectTo || '/');
        }, 3000);
    }, []);

    return (
        <Layout>
            <Loader fullscreen={false}/>
            <a href={redirectTo}>Redirection...</a>
        </Layout>
    );
};

export default Callback;
