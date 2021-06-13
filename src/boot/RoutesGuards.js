import { Loading } from "quasar";

export default ({ app, router, store, Vue }) => {
  async function getWallet() {
    await store.dispatch("b2c/wallet/show");
  }

  async function getProfile() {
    await store.dispatch("b2c/profile/show");
  }

  router.beforeEach(async (to, from, next) => {
    const user = store.getters["b2c/profile/profile"];
    if (to.meta.auth && !user) {
      try {
        Loading.show();
        await Promise.all([getProfile(), getWallet()]);
      } catch (e) {
        if (!e.response) throw e;
        if (e.response.status === 401) {
          store.dispatch("b2c/auth/logout");
          return next({ name: "login" });
        }
        throw e;
      } finally {
        Loading.hide();
      }
    }
    next();
  });
};
