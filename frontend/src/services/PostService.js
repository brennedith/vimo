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

  get = () => {
    const { service } = this;
    const path = '/';
    return service.get(path);
  };

  delete = id => {
    const { service } = this;
    const path = `/${id}`;
    return service.get(path);
  };
}

const postService = new Post(`${endpoint}/api/post`);

export default postService;
