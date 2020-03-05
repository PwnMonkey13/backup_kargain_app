const setHeaders = (method, token = null, params) => {
	let headers = {};
	if(['POST', 'PUT'].includes(method)) headers['Content-Type'] = 'application/json';
	if(token) headers['Authorization'] = `Bearer ${token}`;
	return Object.assign(headers, params);
};

export default setHeaders;
