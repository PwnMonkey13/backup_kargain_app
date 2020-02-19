const handleResponse = response => {

	if (!response.ok) {
		if ([401, 403].includes(response.status)) {
			throw "Session expirée. Merci de vous reconnecter";
		}
		else{
			return response.json().then(json => {
				if(json.success === false) throw Error(json.msg);
			})
			.catch(err => {
				console.log(err);
				throw err.message || err;
			});
		}
	}
	return response;
};

export default handleResponse;
