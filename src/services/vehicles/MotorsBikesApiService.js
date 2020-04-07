import fetch from 'isomorphic-unfetch';
import config from '../../config/config';
import handleResponse from "../../libs/handleResponse";
const queryString = require('query-string');

function buildUrl(url, params) {
    return Object.keys(params).length ? `${url}?${queryString.stringify(params)}` : url;
}

function getMakes(makes) {
    let params = {};
    let makesParams = null;
    if (makes && Array.isArray(makes)) {
        makesParams = makes.filter(make => typeof make === "string").join(',');
        params = {...params, filter : makesParams};
    }

    const url = buildUrl(`${config.api}/vehicles/internal/motorcycles/makes`, params);
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

function getMakeModels(make) {
    if (!make) throw 'make param is required';
    const url = `${config.api}/vehicles/internal/motorcycles/${make}/models`;

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
