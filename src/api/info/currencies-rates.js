import { apiWithMainServer } from "src/api/helpers/ky";

function list() {
  return apiWithMainServer("b2c/info/currencies-rates").json();
}

export { list };
