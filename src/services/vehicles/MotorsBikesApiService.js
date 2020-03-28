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
    console.log(makes);
    if (makes && Array.isArray(makes)) {
        makesParams = makes.filter(make => typeof make === "string").join(',');
        params = {...params, filter : makesParams};
    }

    const url = buildUrl(`${config.api}/vehicles/internal/motorcycles/makes`, params);
    console.log(url);

    return fetch(url)
        .then(handleResponse)
        .then(json => {
            if (json.success === false) throw json.msg;
            else return json.data;
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
            if (json.success === false) throw json.msg;
            else return json.data;
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
            if (json.success === false) throw json.msg;
            else return json.data;
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
            if (json.success === false) throw json.msg;
            else return json.data;
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
