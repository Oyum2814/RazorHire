const env = process.env.REACT_APP_ENV;

const apiBaseUrlMap = {
  dev: "http://localhost:3001",
  prod: "https://api.razorhire.ai",
};

const config = {
  env,
  apiBaseUrl: apiBaseUrlMap[env],
};

console.log({ config });

export default config;
