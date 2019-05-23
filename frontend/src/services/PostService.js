import axios from 'axios';

import config from './config';

const { endpoint } = config;

class Post {
  constructor(baseURL) {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    });
  }

  create(type, body) {
    const { service } = this;
    const path = `/${type}`;
    return service.post(path, body);
  }

  getSent = () => {
    const { service } = this;
    const path = '/sent';
    return service.get(path);
  };

  getReceived = () => {
    const { service } = this;
    const path = '/received';
    return service.get(path);
  };

  open = (id, body) => {
    const { service } = this;
    const path = `/${id}`;
    return service.post(path, body);
  };

  getNearby = body => {
    const { service } = this;
    const path = '/nearby';
    return service.get(path, body);
  };

  delete = id => {
    const { service } = this;
    const path = `/${id}`;
    return service.delete(path);
  };
}

const postService = new Post(`${endpoint}/api/post`);

export default postService;
