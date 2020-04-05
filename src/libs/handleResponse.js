import config from '../config/config';

const handleResponse = response => {
	if (response.ok) {
		return response.json()
			.then(json => {
				if (json.success === false) throw json.error;
				return json;
			})
			.catch(err => {
				let error = new Error(err.message);
				error.code = err.code;
				error.name = err.name;
				throw error;
			}
		);
	}
	else {
		let msg = null;
		switch(response.status){
			case 401:
			case 403:
				msg = "Session expirée. Merci de vous reconnecter";
				break;
			case 500:
				msg = config.isDev ? response.statusText : "Something failed on the server";
				break;
			default:
				msg = response.statusText;
				break;
		}
		let err = new Error(msg);
		err.code = response.status;
		err.name = err.statusCode
	}
};

export default handleResponse;
