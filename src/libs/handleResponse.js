const handleResponse = response => {
	if (!response.ok) {
		if ([401, 403].includes(response.status)) {
			let err = new Error('Session expirée. Merci de vous reconnecter');
			err.name = 'UnauthorizedError';
			throw err;
		}
		else{
			return response.json().then(json => {
				if(json.success === false) throw Error(json.msg);
			})
			.catch(err => {
				throw err;
			});
		}
	}
	return response;
};

export default handleResponse;
