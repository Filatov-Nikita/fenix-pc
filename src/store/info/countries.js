import * as CountriesAPI from "src/api/info/countries";

const state = {
  countries: null
};

const getters = {
  countries(state) {
    return state.countries;
  }
};

const mutations = {
  setCountries(state, countries) {
    state.countries = countries;
  }
};

const actions = {
  async list({ commit }) {
    const {data: list} = await CountriesAPI.list();
    commit("setCountries", list);
    return list;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
