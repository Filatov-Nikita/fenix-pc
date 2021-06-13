import ky from "ky";
import {
  getAccessToken,
  getRefreshToken,
  setTokensData,
  cleanTokensData,
  getTokenType
} from "src/api/helpers/tokens";
// import { updateTokens as updateTokensB2C } from 'src/api/b2c/auth';

const availableTokens = ["b2c"];
const apiBytokenType = {
  b2c: async function() {}
};

function rejectedUpdateToken(response) {
  cleanTokensData();
  // if (window.unauthorizeRequest) window.unauthorizeRequest(response);
  return response;
}

const apiWithMainServer = ky.create({
  prefixUrl: process.env.API,
  timeout: 30000
});

const apiWithOptionalToken = apiWithMainServer.extend({
  hooks: {
    beforeRequest: [
      request => {
        const token = getAccessToken();

        if (token !== null) {
          request.headers.set("Authorization", "Bearer " + token);
        }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return;

        const refreshToken = getRefreshToken();
        const tokenType = getTokenType();
        if (
          refreshToken === null ||
          tokenType === null ||
          !availableTokens.includes(tokenType)
        )
          return rejectedUpdateToken(response);

        try {
          const tokensData = await updateTokens(refreshToken, tokenType);
          const { access_token, refresh_token } = tokensData;
          setTokensData(access_token, refresh_token);
          request.headers.set("Authorization", "Bearer " + access_token);
          return ky(request);
        } catch (e) {
          return rejectedUpdateToken(response);
        }
      }
    ]
  }
});

function updateTokens(refresh_token, tokenType) {
  return apiBytokenType[tokenType]({ refresh_token });
}

export { apiWithMainServer, apiWithOptionalToken, updateTokens };
