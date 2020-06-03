import fetch from 'isomorphic-unfetch';
import querystring from 'query-string';
import handleResponse from '../libs/handleResponse';
import config from '../config/config';
import * as Facebook from 'fb-sdk-wrapper';

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

function OAuthLogin (provider) {

    // Login + get authorisation for additional scopes
    Facebook.login({
        scope: 'public_profile,email',
        return_scopes: true,
    })
        .then((response) => {
            console.log(response);
            if (response.authResponse) {
                const query = querystring.stringify({ access_token: response.authResponse.accessToken });
                const requestOptions = {
                    method: 'GET',
                };

                const url = `${config.api}/auth/${provider}?${query}`
                return fetch(url, requestOptions)
                    .then(handleResponse)
                    .then(json => {
                        console.log(json);
                        return json.data;
                    })
                    .catch(err => {
                            throw err;
                        },
                    );
            }
        });
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
        });
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
        });
}

function authorize () {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    };

    const url = `${config.api}/auth/authorize`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function authorizeSSR (headers) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers,
    };

    const url = `${config.api}/auth/authorize`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
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
        });
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
        });
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
        });
}

export default {
    login,
    OAuthLogin,
    logout,
    register,
    registerPro,
    authorize,
    authorizeSSR,
    confirmAccount,
    forgotPassword,
    resetPassword,
};
