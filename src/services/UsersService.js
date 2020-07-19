import queryString from 'querystring';
import handleResponse from '../libs/handleResponse';
import config from '../config/config';

function getUsers (params = {}) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    let url = `${config.api}/users/all`;

    if (Object.keys(params).length !== 0) {
        url += `?${queryString.stringify(params)}`;
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        }
        );
}

function getUserByUsername (username) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    if (!username) throw 'missing username during fetch user';
    let url = `${config.api}/users/username/${username}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getUserByUsernameSSR (username, headers) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers
    };

    if (!username) throw 'missing username during fetch user';
    let url = `${config.api}/users/username/${username}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        }
        );
}

function updateUser (updates) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    };

    const url = `${config.api}/users/update`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function removeUser (username) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    };

    const url = `${config.api}/users/${username}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        }
        );
}

function uploadAvatar (formData) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: formData
    };

    const url = `${config.api}/users/upload/avatar`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function followUser (userId) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include'
    };

    const url = `${config.api}/users/follow/${userId}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        }
        );
}

function unFollowUser (userId) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include'
    };

    const url = `${config.api}/users/unfollow/${userId}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        }
        );
}

const subscribeNewsletter = (data) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const url = `${config.api}/users/newsletter`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
};

const contact = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const url = `${config.api}/users/contact`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
};

const origin = () => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    const url = `${config.api}/origin`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            console.log(json);
            return json;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

export default {
    getUsers,
    getUserByUsername,
    getUserByUsernameSSR,
    updateUser,
    removeUser,
    uploadAvatar,
    followUser,
    unFollowUser,
    subscribeNewsletter,
    contact,
    origin
};
