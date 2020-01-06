import handleResponse from '../libs/handleResponse';
import setHeaders from '../libs/authHeaders';
import config from '../config/config';

function getUsers(uid = null) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // headers: setHeaders()
    };

    let url = `${config.api}/users`;
    if (uid) url += '/' + uid;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(res => res.json())
        .then(json => {
            if (json.success === false) throw json.msg;
            else return json.data;
        })
        .catch(err => {
            throw err;
        });
}

function updateUser(user) {

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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // headers: setHeaders({
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }),
        body: user
    };

    let url = `${config.api}/users/${user._id}`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(res => res.json())
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
