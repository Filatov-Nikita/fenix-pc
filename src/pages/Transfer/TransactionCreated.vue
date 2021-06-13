<template>
  <transition appear appear-active-class="animated zoomIn">
    <q-page class="tw-px-6 tw-py-4">
      <img
        src="images/transaction.svg"
        alt=""
        class="tw-mb-10 tw-mx-auto"
      />
      <div class="tw-text-center tw-mb-8">
        <div class="tw-my-4 actualBalance">
          <span class="tw-line-through tw-font-gilroy tw-text-sm">{{
            balanceBefore
          }}</span>
          <span> -> </span>
          <span>{{ wallet.balance }}</span>
        </div>
        <div
          class="tw-font-gilroy tw-font-semibold amount"
          :class="{ 'amount-incoming': incoming }"
        >
          {{ incoming ? '+' : '-' }} {{ amount }}
        </div>
      </div>
      <WalletAmount
        :amount="wallet.balance"
        :verified="wallet.verified"
        class="tw-mb-8"
      />
      <app-button color="eBlack" label="Закрыть" @click="close" />
    </q-page>
  </transition>
</template>

<script>
import WalletAmount from 'src/components/Wallet/WalletAmount';
import { mapGetters } from 'vuex';

export default {
  props: {
    amount: {
      required: true,
      type: String,
    },
    incoming: {
      required: true,
      type: Boolean,
    },
    backTo: {
      default: 'main',
      type: String,
    },
    balanceBefore: {
      required: true,
      type: String,
    },
  },
  computed: {
    ...mapGetters('b2c/wallet', ['wallet']),
  },
  methods: {
    close() {
      this.$router.push({ name: this.backTo });
    },
  },
  components: {
    WalletAmount,
  },
};
</script>

<style scoped>
.amount {
  color: #1a1a1a;
  font-size: 31px;
}

.amount-incoming {
  @apply tw-text-positive;
}

.actualBalance {
  color: #9a9a9d;
}
</style>
