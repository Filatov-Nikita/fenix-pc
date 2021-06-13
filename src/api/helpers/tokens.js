const storage = window.localStorage;

function setTokensData(access, refresh, tokenType = null) {
  let accessTokenData = parseJwt(access);

  storage.setItem('expiresIn', accessTokenData.payload.exp);
  storage.setItem('accessToken', access);
  storage.setItem('refreshToken', refresh);

  if (tokenType) setTokenType(tokenType);
}

function getAccessToken() {
  const token = storage.getItem('accessToken');
  if (isTokenExpired()) return null;
  return token;
}

function isTokenExpired() {
  const token = storage.getItem('accessToken');
  const currentTime = (+(new Date)) / 1000;
  const expiresIn = storage.getItem('expiresIn');

  return !(token !== null && expiresIn !== null && +expiresIn > currentTime);
}

function getRefreshToken() {
  return storage.getItem('refreshToken');
}

function cleanTokensData() {
  storage.removeItem('refreshToken');
  storage.removeItem('accessToken');
  storage.removeItem('expiresIn');
  storage.removeItem('tokenType');
}

function setTokenType(str) {
  storage.setItem('tokenType', str);
}

function getTokenType() {
  return storage.getItem('tokenType');
}

function parseJwt(token) {
  let parts = token.split('.');

  return {
    header: parsePart(parts[0]),
    payload: parsePart(parts[1])
  }
}

function parsePart(str) {
  return JSON.parse(atob(str));
}

export {
  setTokensData,
  getAccessToken,
  getRefreshToken,
  cleanTokensData,
  setTokenType,
  getTokenType,
  isTokenExpired
};
