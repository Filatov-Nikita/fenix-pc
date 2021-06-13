import auth from "./auth";
import wallet from "./wallet";
import profile from "./profile";
import transactions from "./transactions";

export default {
  namespaced: true,
  modules: {
    auth,
    wallet,
    profile,
    transactions
  }
};
