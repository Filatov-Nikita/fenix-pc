<template>
  <div class="tw-p-4 dashed border rounded-10 tw-flex tw-items-center">
    <img src="images/fenix.svg" class="tw-mr-4" />
    <div class="tw-flex tw-w-full">
      <div>
        <div class="wallet-amount tw-text-xl tw-mr-3 tw-leading-none">
          {{ amount }}{{ fenixSign }}
        </div>
        <div class="app-hint">Ваш счет</div>
      </div>
      <q-space />
      <WalletVerifyStatus :verified="verified" />
    </div>
  </div>
</template>

<script>
import WalletVerifyStatus from 'src/components/Wallet/WalletVerifyStatus';
import { mapGetters } from 'vuex';

export default {
  props: {
    amount: {
      required: true,
      type: String,
    },
    verified: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(['fenixSign']),
  },
  components: {
    WalletVerifyStatus,
  },
};
</script>

<style scoped>
.border {
  border-color: #c4c4c4;
}
</style>
