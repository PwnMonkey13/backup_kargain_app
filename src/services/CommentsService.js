import handleResponse from '../libs/handleResponse';
import config from '../config/config';

function createComment (body) {
    const url = `${config.api}/comments`;
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        }
        );
}

function createCommentResponse (body) {
    const url = `${config.api}/comments/response`;
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        }
        );
}

export default {
    createComment,
    createCommentResponse
};
