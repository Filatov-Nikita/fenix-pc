import { apiWithMainServer } from "src/api/helpers/ky";

function getTokens({ password, username }) {
  return apiWithMainServer
    .post("b2c/auth/token", {
      json: {
        username,
        password,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "password"
      }
    })
    .json();
}

function recieveCode({ cellphone }) {
  return apiWithMainServer.post("b2c/auth/resend-verification", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    json: { cellphone }
  });
}

function applyPassword({ cellphone, password, verification_code }) {
  return apiWithMainServer.post("b2c/auth/password", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    json: { cellphone, password, verification_code }
  });
}

function register(body) {
  return apiWithMainServer
    .post("b2c/auth/register", {
      json: body
    })
    .json();
}

export { getTokens, recieveCode, applyPassword, register };
