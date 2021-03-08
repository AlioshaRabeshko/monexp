async function getConfig(locale, connection) {
  return Promise.all([getTextConfig(), getAppConfig()]);
}

async function getTextConfig(locale, connection) {
  return new Promise(resolve => setTimeout(() => resolve('getTextConfig'), 0));
}

async function getAppConfig(locale, connection) {
  return 'getAppConfig';
}

export default getConfig;