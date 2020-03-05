import config from '../config/config';

const handleResponse = response => {
	if (response.ok) {
		return response.json().then(json => {
			if (json.success === false) throw json.msg;
			return json;
		}).catch(err => {
			throw err.message || err;
		});
	}
	else {
		switch(response.status){
			case 401:
			case 403:
				throw "Session expirée. Merci de vous reconnecter";
			case 500:
				throw config.isDev ? response.statusText : "Something failed on the server";
			default:
				throw response.statusText;
		}
	}
};

export default handleResponse;
