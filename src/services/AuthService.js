import fetch from 'isomorphic-unfetch';
import handleResponse from '../libs/handleResponse';
import config from '../config/config';

function login (form) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    };

    return fetch(`${config.api}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
                throw err;
            },
        );
}

function logout () {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
    };

    return fetch(`${config.api}/auth/logout`, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
                throw err;
            },
        );
}

function register (form) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    };

    return fetch(`${config.api}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json;
        })
        .catch(err => {
                throw err;
            },
        );
}

function registerPro (form) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    };

    return fetch(`${config.api}/auth/register-pro`, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
                throw err;
            },
        );
}

function authorize () {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    };

    const url = `${config.api}/auth/authorizeSSR`;
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

function authorizeSSR () {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    };

    const url = `${config.api}/auth/authorizeSSR`;
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

function confirmAccount (token) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.api}/auth/confirm-account?token=${token}`, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json;
        })
        .catch(err => {
                throw err;
            },
        );
}

function forgotPassword (email) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    };

    return fetch(`${config.api}/auth/forgot-password`, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
                throw err;
            },
        );
}

function resetPassword (token, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
            password,
        }),
    };

    return fetch(`${config.api}/auth/reset-password`, requestOptions)
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
    login,
    logout,
    register,
    registerPro,
    authorizeSSR,
    confirmAccount,
    forgotPassword,
    resetPassword,
};
