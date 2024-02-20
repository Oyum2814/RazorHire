const env = process.env.REACT_APP_ENV;

const apiBaseUrlMap = {
  dev: "dev-url",
  prod: "prod-url",
};

const config = {
  env,
  apiBaseUrl: apiBaseUrlMap[env],
  // ...   Add all other configs here
};

export default config;
