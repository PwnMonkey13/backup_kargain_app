import fetch from 'isomorphic-unfetch';
import config from '../config/config';
import setHeaders from '../libs/authHeaders'

export async function getPost(slug) {
    const url = "https://jsonplaceholder.typicode.com";
    try {
        let response = await fetch(`${url}?title=${slug}`);
        return await response.json();
    } catch (err) {
        throw err;
    }
}

export async function getPosts(){
    const url = "https://jsonplaceholder.typicode.com";
    const requestOptions = {
        method: 'GET',
        // headers: setHeaders()
    };

    try{
        let response = await fetch(`${url}/posts`);
        return await response.json();
    }catch(err){
        throw err;
    }
}

export async function insertPost(posts) {
    const url = config.api + '/posts';
    const requestOptions = {
        method: 'POST',
        headers: setHeaders({'Content-Type':'application/json'}),
        body: JSON.stringify(posts)
    };

    try {
        let response = await fetch(`${url}`, requestOptions);
        return await response.json();
    } catch (err) {
        throw err;
    }
}
