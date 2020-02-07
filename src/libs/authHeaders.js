import window from 'global'

const setHeaders = (method, token, params) => {
	let headers = {};
	if(method === 'POST') headers['Content-Type'] = 'application/json';
	if(token) headers['Authorization'] = `Bearer ${token}`;
	return Object.assign(headers, params);
};

export default setHeaders;
