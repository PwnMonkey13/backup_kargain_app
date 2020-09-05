import handleResponse from '../libs/handleResponse';
import config from '../config/config';
import queryString from 'query-string';

const baseRoute = `${config.api}/announces`;

//admin
function getAnnouncesAll () {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    return fetch(`${baseRoute}/all`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getFeedAnnounces (params = {}) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    return fetch(buildUrl(`${baseRoute}/feed`,params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getSearchAnnounces (params = {}) {
    const qs = queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true
    });

    const url = `${baseRoute}/search?${qs}`;
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    return fetch(buildUrl(`${baseRoute}/search`,params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getSearchAnnouncesCount (params = {}) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    return fetch(buildUrl(`${baseRoute}/count`,params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getProfileAnnounces (params = {}) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    return fetch(buildUrl(`${baseRoute}/profile`,params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getAnnounceBySlug (slug) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    const url = `${baseRoute}/slug/${slug}`;
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
        body: JSON.stringify(data)
    };

    const url = `${baseRoute}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function updateAnnounce (slug, data) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const url = `${baseRoute}/update/${slug}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function updateAdminAnnounce (slug, updates) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    };

    const url = `${baseRoute}/update-admin/${slug}`;
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
        credentials: 'include'
    };

    const url = `${baseRoute}/remove/${slug}`;
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
        body: formData
    };

    const url = `${baseRoute}/upload/${slug}`;
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
        credentials: 'include'
    };

    const url = `${baseRoute}/addLike/${announceId}`;
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
        credentials: 'include'
    };

    const url = `${baseRoute}/removeLike/${announceId}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
};

export default {
    getFeedAnnounces,
    getSearchAnnounces,
    getSearchAnnouncesCount,
    getAnnouncesAll,
    getAnnounceBySlug,
    createAnnounce,
    updateAnnounce,
    updateAdminAnnounce,
    removeAnnounce,
    uploadImages,
    addLikeLoggedInUser,
    removeLikeLoggedInUser
};
