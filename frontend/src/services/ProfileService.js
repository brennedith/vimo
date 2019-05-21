import axios from 'axios';

import config from './config';

const { endpoint } = config;

class Profile {
  constructor(baseURL) {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    });
  }

  get() {
    const { service } = this;
    const path = `/`;
    return service.get(path);
  }

  update = body => {
    const { service } = this;
    const path = '/';
    return service.patch(path, body);
  };
}

const profileService = new Profile(`${endpoint}/api/profile`);

export default profileService;
