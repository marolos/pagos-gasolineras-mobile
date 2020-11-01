import { REST_API_URL } from './constants';

/**
 * A dummy wrapper class for fetch API
 * It handles common task as parsing the json response,
 * normalize the url (simplest way), and concat the REST endpoint
 * Also allow to set custom http headers and interceptor funtions
 * Author: @miguelquo
 */
class FetchClass {
   baseURL = REST_API_URL;
   headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
   };

   interceptors = [];

   setAuthToken = (token) => {
      this.headers['Authorization'] = `Bearer ${token}`;
   };

   removeAuthToken = () => {
      delete this.headers['Authorization'];
   };

   addHeader = (name, value) => {
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

   handleResponse = async (response) => {
      const contentType = response.headers.map['content-type'];
      if (contentType !== 'application/json') {
         return { body: { msg: 'No JSON' }, status: response.status };
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
      const fullURL = (this.baseURL + url).replace(/([^:]\/)\/+/g, '$1');
      if (params) return `${fullURL}?${new URLSearchParams(params).toString()}`;
      return fullURL;
   };
}

const Fetch = new FetchClass();

export default Fetch;
