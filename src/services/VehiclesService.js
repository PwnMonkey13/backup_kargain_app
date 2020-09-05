import fetch from 'isomorphic-unfetch';
import config from '../config/config';
import handleResponse from '../libs/handleResponse';
const queryString = require('query-string');

function buildUrl (url, params = {}) {
    return Object.keys(params).length ? `${url}?${queryString.stringify(params)}` : url;
}

function getCarsDistinctModels (make) {
    if (!make) throw 'make param is required';
    const url = `${config.api}/vehicles/cars/distinct/make/models`;

    return fetch(buildUrl(url, { make }))
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getCarsMakeModelTrims (make, model) {
    if (!make) throw 'make param is required';
    if (!model) throw 'model param is required';

    const url = `${config.api}/vehicles/cars/distinct/make/model/trims`;

    return fetch(buildUrl(url, { make, model }))
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getCarsMakeModelTrimYears (make, model, trim) {
    if (!make) throw 'make param is required';
    if (!model) throw 'model param is required';
    if (!trim) throw 'trim param is required';

    const url = `${config.api}/vehicles/cars/make/model/trim/years`;

    return fetch(buildUrl(url, {
        make,
        model,
        trim
    }))
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

function getMakes (vehicleType) {
    const url = `${config.api}/vehicles/dyn/${vehicleType}/makes`;
    return fetch(url)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}


function getMakeModels (vehicleType, make) {
    if (!make) throw 'make param is required';
    const url = `${config.api}/vehicles/dyn/${vehicleType}/models`;

    return fetch(buildUrl(url, { make }))
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
    getCarsDistinctModels,
    getCarsDistinctMakeModelTrims,
    getCarsMakeModelTrimYears,
    getVehiclesYearsVersion
};
