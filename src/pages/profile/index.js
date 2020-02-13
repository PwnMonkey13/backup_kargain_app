import React, { useContext } from 'react'
import { UserContext } from '../../components/Context/UserContext';
import {useRouter} from "next/router";

const Index = () => {
    const { session, dispatch } = useContext(UserContext);
    const router = useRouter();
    const { isLoggedIn, user } = session;
    console.log(user);
    return('');
};

export default Index;
