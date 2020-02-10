import React from 'react'
import { useRouter } from 'next/router'

const AuthIndex = (props) => {
    const router = useRouter();
    router.push('/auth/login');
    return ("");
};

export default AuthIndex;
