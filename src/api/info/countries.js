import { apiWithMainServer } from "src/api/helpers/ky";

function list() {
  return apiWithMainServer("b2c/info/countries").json();
}

export { list };
