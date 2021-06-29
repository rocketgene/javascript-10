import Cookies from 'js-cookie';
export default class Data {

  // Generic function to construct fetch request
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null, skipHash = false) {
    const url = 'http://localhost:5000/api' + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const userCredentials = this.authenticate(credentials.username, credentials.password);
      options.headers['Authorization'] = userCredentials
      Cookies.set('userCredentials', JSON.stringify(userCredentials), {expires: 3})
    }

    if (skipHash) {
        options.headers['Authorization'] = credentials.slice(1, credentials.length - 1);
    }
    return fetch(url, options);
  }

  authenticate(username, password) {
    const encodedCredentials = btoa(`${username}:${password}`);
    return `Basic ${encodedCredentials}`;
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return true;
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    
  }

  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    
  }

  async getCourse(path) {
    const response = await this.api(`/courses` + path, 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    
  }

  async deleteCourse(path, credentials) {
    const response = await this.api(`/courses` + path, 'DELETE', null, false, credentials, true);
    if (response.status === 204) {
      return true;
    }
    else if (response.status === 401) {
      return null;
    }
    
  }

  async createCourse(body, credentials) {
    const response = await this.api('/courses', 'POST', body, false, credentials, true);
    if (response.status === 201) {
      return true;
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    
  }

  async updateCourse(path, body, credentials) {
    const response = await this.api('/courses' + path, 'PUT', body, false, credentials, true);
    if (response.status === 204) {
      return true;
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    
  }
}
