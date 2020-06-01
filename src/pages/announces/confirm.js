import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AnnounceService from '../../services/AnnounceService';

const ConfirmAccount = () => {
    const router = useRouter();
    const { token } = router.query;
    const [err, setErr] = useState(null)

    useEffect(() => {
        if (!token) return;
        AnnounceService.confirmAnnounce(token)
            .then(document => {
                if(document.slug)
                    router.push(`/auth/callback?redirect=/announces/${document.slug}/edit`);
                else throw (new Error('unknown announce'))
            })
            .catch(err => {
                setErr(err.message)
            });
    }, []);

    return (
        <main>
            {err}
        </main>
    );
};

export default ConfirmAccount;
