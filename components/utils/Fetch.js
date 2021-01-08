import { REST_API_URL } from './constants';

/**
 * A dummy wrapper class for fetch API
 * It handles common task as parsing the json response,
 * normalize the url (simplest way), and concat the REST endpoint
 * Also allow to set custom http headers and interceptor funtions
 * Author: @miguelquo
 */
export class FetchClass {
	constructor(baseURL) {
		this.baseURL = baseURL;
		this.headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};
		this.interceptors = [];
	}

	addNetEvent = () => {};

	removeNetEvent = () => {};

	setAuthToken = (token) => {
		this.headers['Authorization'] = `Bearer ${token}`;
	};

	removeAuthToken = () => {
		delete this.headers['Authorization'];
	};

	setHeader = (name, value) => {
		this.headers[name] = value;
	};

	/**
	 * @param {Object: {fn: Function, alias: String}} interceptor
	 * fn: Function - handle que fetch response status
	 * it allows to handle status like 401 (Unauthorized) to perform a logout action
	 * alias: String - identifier for the interceptor
	 */
	addInterceptor = (interceptor) => {
		this.interceptors.push(interceptor);
	};

	clearInterceptors = () => {
		this.interceptors = [];
	};

	removeInterceptor = (alias) => {
		if (!alias) return;
		this.interceptors = this.interceptors.filter((i) => i.alias !== alias);
	};

	get = async (url, params) => {
		const response = await fetch(this.normalizeUrl(url, params), {
			method: 'GET',
			headers: this.headers,
		});
		return await this.handleResponse(response);
	};

	post = async (url, body) => {
		const response = await fetch(this.normalizeUrl(url), {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body),
		});
		return await this.handleResponse(response);
	};

	put = async (url, body) => {
		const response = await fetch(this.normalizeUrl(url), {
			method: 'PUT',
			headers: this.headers,
			body: JSON.stringify(body),
		});

		return await this.handleResponse(response);
	};

	delete = async (url, params) => {
		const response = await fetch(this.normalizeUrl(url, params), {
			method: 'DELETE',
			headers: this.headers,
		});
		return await this.handleResponse(response);
	};

	form = async (url, formObj) => {
		let body = new FormData();
		Object.keys(formObj).forEach((key) => body.append(key, formObj[key]));
		let response = await fetch(this.normalizeUrl(url), {
			method: 'POST',
			headers: { ...this.headers, 'content-type': 'multipart/form-data' },
			body,
		});
		return await this.handleResponse(response);
	};


	handleResponse = async (response) => {
		const contentType = response.headers.map['content-type'];
		if (!contentType.includes('application/json')) {
			throw { body: { msg: 'No JSON' }, status: response.status };
		}
		const body = await response.json();
		const data = { body, status: response.status };

		this.interceptors.forEach((interceptor) => {
			interceptor.fn(data);
		});

		if (response.status >= 400) {
			throw data;
		}
		return data;
	};

	normalizeUrl = (url, params) => {
		let fullURL;
		if (this.baseURL) {
			fullURL = (this.baseURL + url).replace(/([^:]\/)\/+/g, '$1');
		} else {
			fullURL = url.replace(/([^:]\/)\/+/g, '$1');
		}
		if (params) return `${fullURL}?${new URLSearchParams(params).toString()}`;
		return fullURL;
	};
}

const Fetch = new FetchClass(REST_API_URL);

export default Fetch;
