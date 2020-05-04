import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useRouter } from 'next/router'

const Index = () => {
    const { session, dispatch } = useContext(UserContext)
    const router = useRouter()
    const { isLoggedIn, user } = session
    return null
}

export default Index
