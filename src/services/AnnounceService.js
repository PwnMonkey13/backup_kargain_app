import fetch from 'isomorphic-unfetch'
import handleResponse from '../libs/handleResponse'
import config from '../config/config'
import queryString from 'query-string'

const baseRoute = `${config.api}/announces`

function getAnnounces (params = {}) {
    const qs = queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
    })
    const url = `${baseRoute}?${qs}`
    const requestOptions = {
        method: 'GET',
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err
            },
        )
}

function getAnnouncesAll () {
    const url = `${baseRoute}/all`
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err
            },
        )
}

function getAnnounceBySlug (slug) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    }

    const url = `${baseRoute}/slug/${slug}`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data
        })
        .catch(err => {
            throw err
        })
}

function getAnnounceBySlugSSR (slug, headers) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers,
    }

    const url = `${baseRoute}/slug/${slug}`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function createAnnounce (data) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }

    const url = `${baseRoute}`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

const confirmAnnounce = (token) => {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
    }

    const url = `${baseRoute}/confirm/${token}`

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data
        })
        .catch(err => {
            throw err
        })
}

function updateAnnounce (slug, data) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }

    const url = `${baseRoute}/update/${slug}`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function removeAnnounce (slug) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
    }

    const url = `${baseRoute}/remove/${slug}`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function uploadImages (slug, formData) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }

    const url = `${baseRoute}/upload/${slug}`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

const addLikeLoggedInUser = (announceId) => {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
    }

    const url = `${baseRoute}/addLike/${announceId}`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

const removeLikeLoggedInUser = (announceId) => {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
    }

    const url = `${baseRoute}/removeLike/${announceId}`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

export default {
    getAnnounces,
    getAnnouncesAll,
    getAnnounceBySlugSSR,
    getAnnounceBySlug,
    createAnnounce,
    confirmAnnounce,
    updateAnnounce,
    removeAnnounce,
    uploadImages,
    addLikeLoggedInUser,
    removeLikeLoggedInUser,
}
