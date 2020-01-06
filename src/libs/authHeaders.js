const setHeaders = (params) => {
	let headers = {};
	let token = window.localStorage.getItem('token');
	if (token != null) {
		headers['Authorization'] = 'Bearer ' + token;
	}

	return Object.assign(headers, params);
};

export default setHeaders;
