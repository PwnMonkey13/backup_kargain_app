import config from '../config/config'
import handleResponse from '../libs/handleResponse'
import querystring from 'querystring'

const API_URL = `${config.api}/places`

function fetchGeoGouvStreets (params) {
    // available parameters
    const { q, limit, autocomplete, lat, lon, type, postcode, citycode } = params
    const defaultParams = {
        type: 'housenumber', // housenumber, street, locality, municipality
        autocomplete: 1,
        limit: 10
    }
    return internalFetchGeoGouv({ ...defaultParams, ...params })
}

function fetchGeoGouvCities (params) {
    // available parameters
    const { q, limit, autocomplete, lat, lon, type, postcode, citycode } = params
    const defaultParams = {
        type: 'municipality', // housenumber, street, locality, municipality
        autocomplete: 1,
        limit: 10
    }
    return internalFetchGeoGouv({ ...defaultParams, ...params })
}

const internalFetchGeoGouv = (params) => {
    const url = buildUrl(API_URL, '/adresses-gouv', params)
    return fetch(url)
        .then(handleResponse)
        .then(json => {
            return json.data
        })
        .then(data => {
            if (data.features) return data.features
            else return []
        })
        .catch(err => {
            throw err
        }
        )
}

function fetchVipocoCities (query) {
    const url = `${API_URL}/vicopo/${query}`
    return fetch(url)
        .then(handleResponse)
        .then(json => {
            return json.data
        })
        .then(data => {
            if (data.cities) return data.cities
            else return []
        })
        .catch(err => {
            throw err
        }
        )
}

const buildUrl = (url, endpoint, params) => {
    return `${url}${endpoint}?${querystring.stringify(params)}`
}

export default {
    fetchGeoGouvStreets,
    fetchGeoGouvCities,
    fetchVipocoCities
}
