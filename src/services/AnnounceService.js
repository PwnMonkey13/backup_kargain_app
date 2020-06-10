import fetch from 'isomorphic-unfetch';
import handleResponse from '../libs/handleResponse';
import config from '../config/config';
import queryString from 'query-string';

function getAnnounces (params = {}) {
    const qs = queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
    });
    const url = `${config.api}/ads?${qs}`;
    const requestOptions = {
        method: 'GET',
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err;
            },
        );
}

function getAnnouncesAll () {
    const url = `${config.api}/ads/all`;
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err;
            },
        );
}

function getAnnounceBySlug (slug) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    };

    const url = `${config.api}/ads/slug/${slug}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        });
}

function getAnnounceBySlugSSR (slug, headers) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers,
    };

    const url = `${config.api}/ads/slug/${slug}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        });
}

function createAnnounce (data) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    const url = `${config.api}/ads`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

const confirmAnnounce = (token) => {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
    };

    const url = `${config.api}/ads/confirm/${token}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        });
};

function updateAnnounce (slug, data) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    const url = `${config.api}/ads/update/${slug}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function removeAnnounce (slug) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
    };

    const url = `${config.api}/ads/remove/${slug}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function uploadImages (slug, formData) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: formData,
    };

    const url = `${config.api}/ads/upload/${slug}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

const addLikeLoggedInUser = (announceId) => {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
    };

    const url = `${config.api}/ads/addLike/${announceId}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
};

const removeLikeLoggedInUser = (announceId) => {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
    };

    const url = `${config.api}/ads/removeLike/${announceId}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
};

export default {
    getAnnounces,
    getAnnouncesAll,
    getAnnounceBySlugSSR,
    getAnnounceBySlug,
    createAnnounce,
    confirmAnnounce,
    updateAnnounce,
    removeAnnounce,
    uploadImages,
    addLikeLoggedInUser,
    removeLikeLoggedInUser,
};
