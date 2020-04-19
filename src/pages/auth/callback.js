import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Loader from '../../components/Loader'

const Callback = () => {
    const router = useRouter()
    const { redirect } = router.query

    useEffect(() => {
        setTimeout(() => {
            router.push(redirect || '/')
        }, 3000)
    }, [])

    return (
        <>
            <Loader fullscreen={false}/>
            <Link href={redirect}>
                <a>Redirection...</a>
            </Link>
        </>
    )
}

export default Callback
