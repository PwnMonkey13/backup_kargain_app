import fetch from 'isomorphic-unfetch'
import handleResponse from '../libs/handleResponse'
import config from '../config/config'
import setHeaders from '../libs/authHeaders'
import querystring from 'querystring'

const buildUrl = (url, endpoint = '/', params = null) => {
    if (params) return `${url}${endpoint}?${querystring.stringify(params)}`
    else return `${url}${endpoint}`
}

const objToBase64 = (obj) => {
    const data = JSON.stringify(obj)
    const buff = new Buffer(data)
    return buff.toString('base64')
}

function getAnnounces ({ filters, sorter, ...params }) {
    const requestOptions = {
        method: 'GET'
    }

    const data = { filters, sorter }
    const obfuscatedFilters = objToBase64(data)
    const url = buildUrl(config.api, `/ads/announces/${obfuscatedFilters}`, params)

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data
        })
        .catch(err => {
            throw err
        }
        )
}

function getAnnounceBySlug (slug) {
    const requestOptions = {
        headers: setHeaders('GET')
    }

    const url = `${config.api}/ads/slug/${slug}`

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data
        })
        .catch(err => {
            throw err
        }
        )
}

function createAnnounce (data, token) {
    const requestOptions = {
        method: 'POST',
        headers: setHeaders('POST', token),
        body: JSON.stringify(data)
    }

    const url = `${config.api}/ads`
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data
        })
        .catch(err => {
            throw err
        })
}

export default {
    getAnnounces,
    getAnnounceBySlug,
    createAnnounce
}
