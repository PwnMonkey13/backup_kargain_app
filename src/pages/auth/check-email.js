import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../layouts/Layout'
import {UserContext} from "../../components/Context/UserContext";

export default () => {
    const { session } = useContext(UserContext);
    return(
        <Layout>
            <div className="text-center pt-5 pb-5">
                <h1 className="display-4">Check your email</h1>
                <p className="lead">
                    A sign in link has been sent to
                    { session.user && session.user.email
                      ? <span className="font-weight-bold">{session.user.email}</span>
                      : <span>your inbox</span>
                    }.
                </p>
            </div>
        </Layout>
    )
}
