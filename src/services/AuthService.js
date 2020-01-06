import handleResponse from '../libs/handleResponse';
import setHeaders from '../libs/authHeaders';
import config from '../config/config';

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.api}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.success === false) throw json.msg;
            else return json.data;
        })
        .catch(err => {
            throw err;
        }
    );
}

function register(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.api}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(res => res.json())
        .then(json => {
            if (json.success === false) throw json.msg;
            else return json.data;
        })
        .catch(err => {
            throw err;
        }
    );
}

function authorizeUser() {
    const requestOptions = {
        method: 'GET',
        headers: setHeaders(),
    };

    return fetch(`${config.api}/auth/authorize`, requestOptions)
        .then(handleResponse)
        .then(res => res.json())
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
    authorizeUser,
    signout
};
