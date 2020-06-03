import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'

const Callback = () => {
    const router = useRouter()
    const { redirect } = router.query

    useEffect(() => {
        setTimeout(() => {
            router.push(redirect || '/')
        }, 2000)
    }, [])

    return (
        <div className="flex flex-colmun">
            <Loader fullscreen={false}/>
            <a>Redirection...</a>
        </div>
    )
}

export default Callback
