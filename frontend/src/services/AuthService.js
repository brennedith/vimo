import axios from 'axios';

import config from './config';

const { endpoint } = config;

class Auth {
  constructor(baseURL) {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    });
  }

  signup(body) {
    const { service } = this;
    const path = '/signup';
    return service.post(path, body);
  }

  login = body => {
    const { service } = this;
    const path = '/login';
    return service.post(path, body);
  };

  user = () => {
    const { service } = this;
    const path = '/';
    return service.get(path);
  };

  logout = () => {
    const { service } = this;
    const path = '/logout';
    return service.get(path);
  };
}

const authService = new Auth(`${endpoint}/api/auth`);

export default authService;
