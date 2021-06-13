<template>
  <q-page class="app-wrapper-main tw-bg-eGray">
    <app-top-panel backTo="home" class="tw-mb-6">
      <template #left> <div class="app-title-4">Перевод</div> </template>
    </app-top-panel>
    <!-- <q-tabs
      v-model="currentTab"
      @input="changeTab"
      dense
      content-class="text-grey tw-mb-8"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        name="walletNumber"
        label="По номеру кошелька"
        content-class="tw-normal-case"
      />
      <q-tab
        name="QRScaner"
        label="Сканировать QR"
        content-class="tw-normal-case"
      />
    </q-tabs> -->
    <validation-observer
      tag="form"
      class="q-gutter-y-md tw-mt-0"
      ref="form"
      @submit.prevent="transfer"
    >
      <app-wallet-input v-model="to" vid="to" />
      <WalletAmount :amount="wallet.balance" :verified="wallet.verified" />
      <app-money-input
        v-model="amount"
        label="Сумма"
        purpose="fenix:fenix"
        name="сумма перевода"
        vid="amount"
      />
      <app-input
        class="tw-mt-7"
        rules="required"
        vid="comment"
        v-model="comment"
        label="Сообщение к переводу"
      />
      <app-button
        class="tw-mt-2"
        color="eBlack"
        label="Перевести"
        type="submit"
        :loading="transfering"
      />
    </validation-observer>
  </q-page>
</template>

<script>
import WalletAmount from 'src/components/Wallet/WalletAmount';
import { mapGetters } from 'vuex';
import { mapWaitingGetters, waitFor } from 'vue-wait';

export default {
  data() {
    return {
      to: '',
      amount: '',
      comment: '',
      // currentTab: 'walletNumber',
    };
  },
  computed: {
    ...mapGetters('b2c/wallet', ['wallet']),
    ...mapGetters('b2c/profile', ['avatar']),
    ...mapWaitingGetters({
      transfering: 'transfering',
    }),
  },
  methods: {
    // changeTab(name) {
    //   console.log(name);
    //   if (name === 'QRScaner') {
    //     this.$router.push({
    //       name: 'requmoney.main',
    //       params: {
    //         backTo: 'transfer.create',
    //         currentTab: 'qr scaner',
    //       },
    //     });
    //   }
    // },
    transfer: waitFor('transfering', async function () {
      const valid = await this.$refs.form.validate();
      if (!valid) return;
      const { to, amount, comment } = this;

      try {
        const balanceBefore = this.wallet.balance;
        const transaction = await this.$store.dispatch(
          'b2c/transactions/create',
          {
            to,
            comment,
            amount,
          }
        );
        await this.$store.dispatch('b2c/wallet/show');
        this.$router.push({
          name: 'transaction.created',
          params: {
            amount: transaction.amount,
            incoming: transaction.incoming,
            balanceBefore,
          },
        });
      } catch (e) {
        if (!e.response) throw e;

        if (e.response.status === 404) {
          return this.$q.notify({
            type: 'negative',
            message: `Кошелек с номером ${to} не найден в системе. Проверьте правильность номера кошелька`,
          });
        }

        if (e.response.status === 422) {
          const { errors } = await e.response.json();
          return this.$refs.form.setErrors(errors);
        }

        throw e;
      }
    }),
  },
  components: {
    WalletAmount,
  },
};
</script>

<style>
</style>
