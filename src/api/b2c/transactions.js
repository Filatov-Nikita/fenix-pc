import { apiWithOptionalToken } from "src/api/helpers/ky";

function list(filter = {}) {
  return apiWithOptionalToken("b2c/transactions", {
    searchParams: filter
  }).json();
}

function create(body) {
  return apiWithOptionalToken
    .post("b2c/transactions", {
      json: body
    })
    .json();
}

export { list, create };
