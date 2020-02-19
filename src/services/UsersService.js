import fetch from 'isomorphic-unfetch'
import handleResponse from '../libs/handleResponse';
import config from '../config/config';
import setHeaders from "../libs/authHeaders";

function getUsers(username = null, token = null) {
    const requestOptions = {
        method : 'GET',
        headers: setHeaders(token)
    };

    let url = `${config.api}/users`;
    if (username) url += '/' + username;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => {
            if (json.success === false) throw json.msg;
            else return json.data;
        })
        .catch(err => {
            throw err;
        });
}

function updateUser(username, updates, token) {

    // const formData = {
    //     // _csrf: await NextAuth.csrfToken(),
    //     user
    // };

    // URL encode form
    // Note: This uses a x-www-form-urlencoded rather than sending JSON so that
    // the form also in browsers without JavaScript
    // const encodedForm = Object.keys(formData).map((key) => {
    //     return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
    // }).join('&');

    const requestOptions = {
        method: 'PUT',
        headers: setHeaders('PUT', token),
        // headers: setHeaders({
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }),
        body: JSON.stringify(updates)
    };

    let url = `${config.api}/users/${username}`;

    return fetch(url, requestOptions)
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
    getUsers,
    updateUser
};
