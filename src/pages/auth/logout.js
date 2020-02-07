import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../layouts/Layout'
import {UserContext} from "../../components/Context/UserContext";

export default () => {
    const { dispatch } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            dispatch({type : 'logout'});
            router.push({ pathname : '/auth/login' });
        }, 1000)
    }, []);

    return(
        <Layout>
            <div className="text-center pt-5 pb-5">
                <p className="lead">
                    Login out...
                </p>
            </div>
        </Layout>
    )
}
