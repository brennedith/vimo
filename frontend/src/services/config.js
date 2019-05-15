const production_endpoint = 'https://vimo-backend.herokuapp.com';
const development_endpoint = 'http://localhost:5000';

const config = {
  endpoint:
    process.env.NODE_ENV === 'production'
      ? production_endpoint
      : development_endpoint
};

export default config;
