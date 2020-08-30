import { REST_API_URL } from './constants';

class FetchClientClass {
   baseURL = REST_API_URL;
   headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
   };

   setAuthToken(token) {
      this.headers['Authorization'] = `Bearer ${token}`;
   }

   removeAuthToken() {
      delete this.headers['Authorization'];
   }

   addHeader(name, value) {
      this.headers[name] = value;
   }

   get(url, params) {
      return fetch(this.normalizeUrl(url, params), {
         method: 'GET',
         headers: this.headers,
      })
         .then(this.handleResponse)
         .catch((err) => Promise.reject(err));
   }

   post(url, body) {
      return fetch(this.normalizeUrl(url), {
         method: 'POST',
         headers: this.headers,
         body: JSON.stringify(body),
      })
         .then(this.handleResponse)
         .catch((err) => Promise.reject(err));
   }

   put(url, body) {
      return fetch(this.normalizeUrl(url), {
         method: 'PUT',
         headers: this.headers,
         body: JSON.stringify(body),
      })
         .then(this.handleResponse)
         .catch((err) => Promise.reject(err));
   }

   delete(url, params) {
      return fetch(this.normalizeUrl(url, params), {
			method: 'DELETE',
			headers: this.headers
      })
         .then(this.handleResponse)
         .catch((err) => Promise.reject(err));
   }

   handleResponse(response) {
      if (!response.ok) {
         return Promise.reject(response);
      }
      return response.json();
   }

   normalizeUrl(url, params) {
      const fullURL = (this.baseURL + url).replace(/([^:]\/)\/+/g, '$1');
      if (params) return `${fullURL}?${new URLSearchParams(params).toString()}`;
      return fullURL;
   }
}

const FetchClient = new FetchClientClass();

export default FetchClient;
