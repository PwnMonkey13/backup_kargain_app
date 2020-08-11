import fetch from 'isomorphic-unfetch';
import config from '../config/config';
import handleResponse from '../libs/handleResponse';
const queryString = require('query-string');

function buildUrl (url, params = {}) {
    return Object.keys(params).length ? `${url}?${queryString.stringify(params)}` : url;
}

function getMakes (vehicleType) {
    const url = buildUrl(`${config.api}/vehicles/${vehicleType}/makes`);
    return fetch(url)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getMakeModels (vehicleType, makeID) {
    if (!makeID) throw 'make param is required';
    const url = `${config.api}/vehicles/${vehicleType}/${makeID}/models`;

    return fetch(url)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getVehiclesGenerations (make_id, model_id) {
    if (!make_id || isNaN(make_id)) throw 'make param is not a number';
    if (!model_id || isNaN(model_id)) throw 'make param is not a number';

    const params = {
        select: 'generation',
        make_id,
        model_id
    };
    const url = buildUrl(params);
    return fetch(url)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getVehiclesYearsVersion (make_id, model_id, generation_id) {
    if (!make_id || isNaN(make_id)) throw 'make param is not a number';
    if (!model_id || isNaN(model_id)) throw 'make param is not a number';
    if (!generation_id || isNaN(generation_id)) throw 'make param is not a number';
    const params = {
        select: 'year',
        make_id,
        model_id,
        generation_id
    };
    const url = buildUrl(params);
    return fetch(url)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

export default {
    getMakes,
    getMakeModels,
    getVehiclesGenerations,
    getVehiclesYearsVersion
};
