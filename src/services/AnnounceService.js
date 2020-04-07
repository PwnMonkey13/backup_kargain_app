import fetch from 'isomorphic-unfetch';
import handleResponse from '../libs/handleResponse';
import config from '../config/config';
import setHeaders from "../libs/authHeaders";
import querystring from "querystring";

const buildUrl = (url, endpoint = '/', params = null) => {
    if(params) return `${url}${endpoint}?${querystring.stringify(params)}`;
    else return `${url}${endpoint}`;
};

const objToBase64 = (obj) => {
    let data = JSON.stringify(obj);
    let buff = new Buffer(data);
    return buff.toString('base64');
};

function getAnnounces({filters, ...params}) {
    const requestOptions = {
        method : 'GET',
    };

    console.log(filters);
    const obfuscatedFilters = objToBase64(filters);
    let url = buildUrl(config.api, `/ads/announces/${obfuscatedFilters}`, params);
    console.log(url);

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        }
    );
}

function getAnnounceBySlug(slug) {
    const requestOptions = {
        headers: setHeaders('GET')
    };

    let url = `${config.api}/ads/slug/${slug}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
                throw err;
            }
        );
}

function createAnnounce(data, token) {
    const requestOptions = {
        method : 'POST',
        headers: setHeaders('POST', token),
        body: JSON.stringify(data)
    };

    let url = `${config.api}/ads`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        });
}

export default {
    getAnnounces,
    getAnnounceBySlug,
    createAnnounce
};
