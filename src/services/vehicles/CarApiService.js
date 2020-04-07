import fetch from 'isomorphic-unfetch';
import config from '../../config/config';
import handleResponse from "../../libs/handleResponse";
const queryString = require('query-string');

const BASE_API_URL = `${config.api}/vehicles/cars`;
const BASE_API_PARAMS = {format: 'json'};

function buildUrl(params) {
    params = {...BASE_API_PARAMS, ...params};
    return `${BASE_API_URL}?${queryString.stringify(params)}`;
}

function getMakes(makes) {
    let params = {select: 'make'};
    if (makes) {
        if (Array.isArray(makes)) {
            makes = makes.map(make => Number(make)).filter(make => !isNaN(make)).join(',');
        } else {
            if (typeof makes === "string") makes = Number(filter);
            if (isNaN(makes)) return console.log('make param is not a number');
        }
        params = {...params, make_id: makes};
    }

    const url = buildUrl(params);
    return fetch(url)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        }
    );
}

function getMakeModels(make_id) {
    if (!make_id || isNaN(make_id)) throw 'make param is not a number';
    let params = {select: 'model', make_id};
    let url = buildUrl(params);
    return fetch(url)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        }
    );
}

function getCarGenerations(make_id, model_id) {
    if (!make_id || isNaN(make_id)) throw 'make param is not a number';
    if (!model_id || isNaN(model_id)) throw 'make param is not a number';

    let params = {select: 'generation', make_id, model_id};
    let url = buildUrl(params);
    return fetch(url)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        }
    );
}

function getCarYearsVersion(make_id, model_id, generation_id) {
    if (!make_id || isNaN(make_id)) throw 'make param is not a number';
    if (!model_id || isNaN(model_id)) throw 'make param is not a number';
    if (!generation_id || isNaN(generation_id)) throw 'make param is not a number';
    let params = {select: 'year', make_id, model_id, generation_id};
    let url = buildUrl(params);
    return fetch(url)
        .then(handleResponse)
        .then(json => {
            return json.data;
        })
        .catch(err => {
            throw err;
        }
    );
}

export default {
    getMakes,
    getMakeModels,
    getCarGenerations,
    getCarYearsVersion
};
