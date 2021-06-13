import * as walletApi from "src/api/b2c/wallet";

const state = { wallet: null };

const getters = {
  wallet(state) {
    return state.wallet;
  }
};

const mutations = {
  setWallet(state, wallet) {
    state.wallet = wallet;
  }
};

const actions = {
  async show({ commit }) {
    const { data: wallet } = await walletApi.show();
    commit("setWallet", wallet);
    return wallet;
  },
  async calculatePrice(_c, { fenix_amount }) {
    const { data: price } = await walletApi.calculatePrice({ fenix_amount });
    return price;
  },
  async refill({ commit }, { fenix_amount }) {
    const { data: wallet } = await walletApi.refill({ fenix_amount });
    commit("setWallet", wallet);
    return wallet;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
