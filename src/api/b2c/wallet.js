import { apiWithOptionalToken } from "src/api/helpers/ky";

function show() {
  return apiWithOptionalToken("b2c/wallet").json();
}

function calculatePrice(body) {
  return apiWithOptionalToken("b2c/wallet/refill", {
    searchParams: body
  }).json();
}

function refill(body) {
  return apiWithOptionalToken.post("b2c/wallet/refill", {
    json: body
  }).json();
}

export { show, calculatePrice, refill };
