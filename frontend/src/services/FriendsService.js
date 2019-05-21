import axios from 'axios';

import config from './config';

const { endpoint } = config;

class Friends {
  constructor(baseURL) {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    });
  }

  add = id => {
    const { service } = this;
    const path = `/${id}`;
    return service.post(path);
  };

  delete = id => {
    const { service } = this;
    const path = `/${id}`;
    return service.delete(path);
  };

  search = query => {
    const { service } = this;
    const path = `/search?q=${query}`;
    return service.get(path);
  };
}

const friendsService = new Friends(`${endpoint}/api/friends`);

export default friendsService;
