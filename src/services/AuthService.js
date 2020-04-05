import fetch from 'isomorphic-unfetch';
import handleResponse from '../libs/handleResponse';
import setHeaders from '../libs/authHeaders';
import config from '../config/config';

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        // withCredentials: true,
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.api}/auth/login`, requestOptions)
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

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.api}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(json => {
            if (json.success === false) throw json.msg;
            else return json;
        })
        .catch(err => {
            throw err;
        }
    );
}

function registerPro(form) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form })
    };

    return fetch(`${config.api}/auth/register-pro`, requestOptions)
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

function authorize(token) {
    const requestOptions = {
        method: 'GET',
        headers: setHeaders('GET', token),
    };

    return fetch(`${config.api}/auth/authorize`, requestOptions)
        .then(handleResponse)
        .then(json => {
            if (json.success === false) throw json.msg;
            else return json.isLoggedIn;
        })
        .catch(err => {
            throw err;
        }
    );
}

function confirmAccount(token){
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
        }
    );
}

function forgotPassword(email){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    };

    return fetch(`${config.api}/auth/forgot-password`, requestOptions)
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

function resetPassword(token, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password })
    };

    return fetch(`${config.api}/auth/reset-password`, requestOptions)
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

function signout() {}


export default {
    login,
    register,
    registerPro,
    authorize,
    confirmAccount,
    forgotPassword,
    resetPassword,
    signout
};
