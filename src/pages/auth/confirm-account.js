import React, { useEffect } from 'react'
import AuthService from '../../services/AuthService'
import { useRouter } from 'next/router'
import querystring from 'querystring'

const ConfirmAccount = (props) => {
    const router = useRouter()
    const { token } = router.query

    useEffect(() => {
        if (!token) return
        AuthService.confirmAccount(token)
            .then(() => {
                router.push('/auth/callback?redirect=/auth/login')
            })
            .catch(err => {
                const action = err.name === 'AlreadyActivatedError' ? 'already-activated' : 'activation-invalid'
                const redirect = `/auth/error?${querystring({ action })}`
                router.push(`/auth/callback?redirect=${redirect}`)
            }
            )
    }, [])

    return (
        <main>
        </main>
    )
}

export default ConfirmAccount
