import { apiWithOptionalToken } from "src/api/helpers/ky";

function update(formData) {
  return apiWithOptionalToken
    .post("b2c/credential-reviews", { body: formData })
    .json();
}

function show() {
  return apiWithOptionalToken("b2c/profile").json();
}

export { update, show };
