import * as ProfileApi from "src/api/b2c/profile";
import { toFormData } from "src/utilities";

export default {
  namespaced: true,
  state: {
    profile: null
  },
  getters: {
    profile(state) {
      return state.profile;
    },
    avatar(state) {
      if (!state.profile) return state.profile;
      return state.profile.avatar;
    },
    bio(state) {
      if (!state.profile) return state.profile;
      return state.profile.bio;
    }
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    }
  },
  actions: {
    async show({ commit }) {
      const { data: profile } = await ProfileApi.show();
      commit("setProfile", profile);
      return profile;
    },
    async update(_c, body) {
      const formData = toFormData(body);
      const { data: profile } = await ProfileApi.update(formData);
      return profile;
    }
  }
};
