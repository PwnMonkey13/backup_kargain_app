import config from '../config/config';
import handleResponse from '../libs/handleResponse';
import fetch from 'isomorphic-unfetch';

const searchAPIResults = (query) => {
    const url = `${config.api}/search?q=${query}`;
    const requestOptions = {
        method: 'GET',
    };

    console.log(url);
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
                throw err;
            },
        );
};

export default {
    searchAPIResults,
};
