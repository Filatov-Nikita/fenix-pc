import * as AuthApi from "src/api/b2c/auth";
import * as TokensLib from "src/api/helpers/tokens";

export default {
  namespaced: true,
  actions: {
    async recieveCode(_c, { cellphone }) {
      await AuthApi.recieveCode({ cellphone });
      return true;
    },
    async applyPassword(_c, { cellphone, password, verification_code }) {
      await AuthApi.applyPassword({ cellphone, password, verification_code });
      return true;
    },
    async login(_c, { cellphone, password }) {
      const tokens = await AuthApi.getTokens({
        username: cellphone,
        password
      });
      const { access_token, refresh_token } = tokens;
      TokensLib.setTokensData(access_token, refresh_token, "b2c");
      return tokens;
    },
    async logout({ commit }) {
      commit("b2c/profile/setProfile", null, { root: true });
      TokensLib.cleanTokensData();
      return true;
    },
    async register(_c, { cellphone, country_id }) {
      const result = await AuthApi.register({ cellphone, country_id });
      return result.data;
    }
  }
};
