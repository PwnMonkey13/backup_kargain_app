import fetch from 'isomorphic-unfetch'
import handleResponse from '../libs/handleResponse'
import config from '../config/config'
import setHeaders from '../libs/authHeaders'
import querystring from 'querystring'

const buildUrl = (url, endpoint = '/', params = {}) => {
    if (Object.keys(params).length !== 0) {
        return `${url}${endpoint}?${querystring.stringify(params)}`
    } else {
        return `${url}${endpoint}`
    }
}

const objToBase64 = (obj) => {
    // const usefull = Object.keys(obj) > 0 && Object.keys(obj).filter(key => obj[key] != null).length > 0;
    // if(!usefull) return null;
    const data = JSON.stringify(obj)
    const buff = new Buffer(data)
    return buff.toString('base64')
}

function getAnnouncesLegacy (args = {}) {
    const { filters, sorter, ...params } = args;
    const obfuscatedFilters = objToBase64({filters, sorter})
    const url = buildUrl(config.api, `/ads/legacy/${obfuscatedFilters}`, params)
    console.log(url)
    const requestOptions = {
        method: 'GET'
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err
            }
        )
}

function getAnnounces () {
    const url = `${config.api}/ads`;
    const requestOptions = {
        method: 'GET'
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err
            }
        )
}

function getAnnouncesByUser (uid) {
    const url = `${config.api}/ads/user/${uid}`;
    const requestOptions = {
        method: 'GET'
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
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

function uploadImages (slug, formData) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: formData,
    };

    const url = `${config.api}/ads/upload/${slug}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err;
            },
        );
}

export default {
    getAnnouncesLegacy,
    getAnnounces,
    getAnnouncesByUser,
    getAnnounceBySlug,
    createAnnounce,
    uploadImages,
};
