import * as TransactionsApi from "src/api/b2c/transactions";

export default {
  namespaced: true,
  actions: {
    async list(_c, filter = {}) {
      const result = await TransactionsApi.list(filter);
      return result;
    },
    async create(_c, body) {
      const { data: transaction } = await TransactionsApi.create(body);
      return transaction;
    }
  }
};
