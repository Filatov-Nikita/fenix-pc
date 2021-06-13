import * as CurrenciesAPI from "src/api/info/currencies-rates";

const state = {
  items: null
};

const getters = {
  items(state) {
    return state.items;
  },
  mainCurrencies(state) {
    if (!state.items) return state.items;
    const codes = ["RUB", "EUR", "USD"];
    const filteredItems = [];
    const foundCodes = {};
    let restCodes = codes.length;

    for (let item of state.items) {
      const code = item.currency.code;

      if (codes.includes(code)) {
        if (!(code in foundCodes)) {
          foundCodes[code] = true;
          filteredItems.push(item);
          restCodes--;
          if (restCodes <= 0) return filteredItems;
        }
      }
    }

    return filteredItems;
  }
};

const mutations = {
  setItems(state, payload) {
    state.items = payload;
  }
};

const actions = {
  async list({ commit }) {
    const { data: list } = await CurrenciesAPI.list();
    commit("setItems", list);
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
