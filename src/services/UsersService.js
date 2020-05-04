import fetch from 'isomorphic-unfetch';
import queryString from 'querystring';
import handleResponse from '../libs/handleResponse';
import config from '../config/config';

function getUsers (params = {}) {
    const requestOptions = {
        method: 'GET',
    };

    let url = `${config.api}/users`;

    if (Object.keys(params).length !== 0) {
        url += `?${queryString.stringify(params)}`;
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err;
            },
        );
}

function getUser (username) {
    const requestOptions = {
        method: 'GET',
    };

    if (!username) throw 'missing username during fetch user';
    let url = `${config.api}/users/${username}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err;
            },
        );
}

function updateUser (username, updates, token) {
    // const formData = {
    //     // _csrf: await NextAuth.csrfToken(),
    //     user
    // };

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updates),
    };

    const url = `${config.api}/users/${username}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
                throw err;
            },
        );
}

export default {
    getUsers,
    getUser,
    updateUser,
};
