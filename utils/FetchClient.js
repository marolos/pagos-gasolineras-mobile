import { REST_API_URL } from './constants';

class FetchClient {
   baseURL = REST_API_URL;
   headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
   };

   setAuthToken(token) {
      this.headers['Authorization'] = `Bearer ${token}`;
	}
	
	removeAuthToken(){
		delete this.headers['Authorization']
	}

   addHeader(name, value) {
      this.headers[name] = value;
   }

   get(url, params) {
      return fetch(this.normalizeUrl(url, params), {
         method: 'GET',
         headers: this.headers,
      }).then(this.handleResponse);
   }

   post(url, body) {
      return fetch(this.normalizeUrl(url), {
         method: 'POST',
         headers: this.headers,
         credentials: 'include',
         body: JSON.stringify(body),
      }).then(this.handleResponse);
   }

   put(url, body) {
      return fetch(this.normalizeUrl(url), {
         method: 'PUT',
         headers: this.headers,
         body: JSON.stringify(body),
      }).then(this.handleResponse);
   }

   delete(url) {
      return fetch(this.normalizeUrl(url), {
         method: 'DELETE',
      }).then(this.handleResponse);
   }

   handleResponse(response) {
      if (!response.ok) {
         console.log(response.json());
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

export default new FetchClient();
