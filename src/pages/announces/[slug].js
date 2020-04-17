import React from 'react'
import AnnounceService from '../../services/AnnounceService'
import AnnounceCard from '../../components/AnnounceCard'

const Announce = ({ announce }) => {
    return (
        <AnnounceCard announce={announce}/>
    )
}

Announce.getInitialProps = async function ({ query }) {
    const { slug } = query
    try {
        const announce = await AnnounceService.getAnnounceBySlug(slug)
        return { announce }
    } catch (err) {
        return { err }
    }
}

export default Announce
