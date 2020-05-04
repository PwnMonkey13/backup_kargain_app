import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../context/UserContext'

export default () => {
    const { dispatchLogout } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            dispatchLogout()
            router.push({ pathname: '/auth/login' })
        }, 1000)
    }, [])

    return (
        <div className="text-center pt-5 pb-5">
            <p className="lead">
                Login out...
            </p>
        </div>
    )
}
