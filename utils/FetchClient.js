import { REST_API_URL } from './constants';

class FetchClient {
  baseURL = REST_API_URL;
  headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
  };

  setAuthToken(token){
    this.headers['Authentication'] = `Bearer ${token}`;
  };

  addHeader(name, value){
    this.headers[name] = value;
  };

  get(url, params){
    const encodedParams = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetch(this.baseURL + url + encodedParams, {
      method: 'GET',
      headers: this.headers,
    }).then(this.handleResponse);
  };

  post(url, body){
    return fetch(this.baseURL + url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(this.handleResponse);
  };

  put(url, body){
    return fetch(this.baseURL + url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(this.handleResponse);
  };

  delete(url){
    return fetch(this.baseURL + url, {
      method: 'DELETE',
    }).then(this.handleResponse);
  };

  handleResponse(response){
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json();
  };
}

export default new FetchClient();
