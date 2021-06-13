<template>
  <div class="card">
    <div
      class="tw-text-fBlack tw-text-xs tw-font-gilroy tw-text-opacity-50 tw-mb-2 tw-flex tw-justify-between"
    >
      <div>Баланс сертификационного центра</div>
      <!-- <q-btn :to="{ name: 'requmoney.main' }" round flat size="13px">
        <img src="images/home/scan.svg" />
      </q-btn> -->
    </div>
    <div class="balance tw-mb-3">
      <span>{{ wallet.balance }}</span>
      <span class="sign"> {{ fenixSign }} </span>
    </div>
    <div>
      <p>Валюта серт. центра: руб.</p>
    </div>
    <!-- <div
      class="tw-text-opacity-60 tw-font-gilroy tw-text-sm tw-text-fBlack tw-mb-4"
    >
      {{ wallet.id }}
    </div> -->
    <!-- <WalletVerifyStatus :verified="wallet.verified" /> -->
  </div>
</template>

<script>
// import WalletVerifyStatus from 'src/components/Wallet/WalletVerifyStatus';
import { mapGetters } from 'vuex';

export default {
  props: {
    wallet: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapGetters(['fenixSign']),
  },
  components: {
    // WalletVerifyStatus,
  },
};
</script>

<style scoped>
.card {
  border-radius: 16px;
  @apply tw-bg-secondary tw-pl-6 tw-pr-5 tw-py-6 tw-font-gilroy tw-text-fBlack;
}

.balance {
  font-size: 34px;
  @apply tw-font-semibold;
}

.check {
  border-radius: 4px;
}

.sign {
  font-size: 17px;
  color: #000;
  @apply tw-font-bold;
}
</style>
