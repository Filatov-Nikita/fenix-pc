<template>
  <q-page class="app-wrapper-main tw-bg-eGray">
    <app-page-title title="СЦ Феникс" class="tw-mb-8" />
    <HomeBalanceCard v-if="wallet" class="tw-mb-8" :wallet="wallet" />

    <FenixRate
      v-if="mainCurrencies"
      class="tw-mb-8"
      :currencies="mainCurrencies"
    />
  </q-page>
</template>

<script>
import FenixRate from 'src/components/Home/FenixRate';
import HomeBalanceCard from 'src/components/Home/HomeBalanceCard';
import { mapWaitingActions } from 'vue-wait';
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  created() {
    this.showWallet();
  },
  computed: {
    ...mapGetters('b2c/wallet', ['wallet']),
    ...mapGetters('info/currenciesRates', ['mainCurrencies']),
  },
  methods: {
    ...mapWaitingActions('b2c/wallet', {
      showWallet: {
        action: 'show',
        loader: 'loading wallet',
      },
    }),
  },
  components: {
    HomeBalanceCard,
    FenixRate,
  },
};
</script>
