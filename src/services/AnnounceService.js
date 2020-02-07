import fetch from 'isomorphic-unfetch';
import axios from 'axios';
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
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

function getAnnounces() {
    const requestOptions = {
        headers: setHeaders('GET')
    };

    let url = `${config.api}/ads`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(res => res.json())
        .then(json => {
            if (json.success === false) throw json.msg;
            else return json.data;
        })
        .catch(err => {
            throw err;
        });
}

function createAnnounce(data, token) {
    const requestOptions = {
        method : 'POST',
        headers: setHeaders('POST', token),
        body: JSON.stringify(data)
    };

    const params = {
        title : data.title,
        slug : 'auto-occasion-annonce-12360',
        status : 'draft',
        post_content : data.about,


    };


    let url = `${config.api}/ads`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(res => res.json())
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
    createAnnounce
};
