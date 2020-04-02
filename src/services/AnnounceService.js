import fetch from 'isomorphic-unfetch';
import handleResponse from '../libs/handleResponse';
import config from '../config/config';
import setHeaders from "../libs/authHeaders";

function getWPAnnounces(id = null) {
    const requestOptions = {
        headers: setHeaders('GET')
    };

    let url = `${config.wp_rest_api}/announces`;
    if(id) url += `/${id}`;

    return fetch(url)
        .then(handleResponse)
        .then(json => {
            return json;
        })
        .catch(err => {
            throw err;
        });
}

function getAnnounces(sorters, filters) {
    const body = {sorters, filters};

    const requestOptions = {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(body)
    };

    let url = `${config.api}/ads/paginate`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            if (json.success === false) throw json.msg;
            else return json.data;
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
            if (json.success === false) throw json.msg;
            else return json.data;
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
            if (json.success === false) throw json.msg;
            else return json.data;
        })
        .catch(err => {
            throw err;
        });
}

export default {
    getAnnounces,
    getWPAnnounces,
    getAnnounceBySlug,
    createAnnounce
};
