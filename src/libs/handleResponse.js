const handleResponse = response => {
    if (response.ok) {
        return response.json()
            .then(json => {
                if (json.success === false) throw json.error;
                return json;
            })
            .catch(err => {
                    const error = new Error();
                    error.statusCode = err.code || response.status;
                    error.name = err.name || 'UnknownError';
                    error.message = err.message || 'Unknown Error';
                    throw error;
                },
            );
    } else {
        let msg = null;
        switch (response.status) {
        case 401:
        case 403:
            msg = 'Session expirée. Merci de vous reconnecter';
            break;
        default:
            msg = response.statusText;
            break;
        }
        throw new Error(msg);
    }
};

export default handleResponse;
