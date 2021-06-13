<template>
  <q-page class="app-wrapper-main">
    <app-top-panel backTo="main" middle="История" class="tw-mb-8" />
    <div class="tw-mb-10">
      <div class="tw-flex tw-mb-4 tw--mx-2">
        <div class="tw-w-1/3 tw-px-2">
          <app-filter-btn
            class="tw-w-1/3 tw-px-2"
            v-model="date"
            label="Даты"
            type="date"
          />
        </div>
        <div class="tw-w-1/3 tw-px-2">
          <app-filter-btn
            class="tw-w-1/3"
            v-model="type"
            val="outgoing"
            label="Списание"
            type="radio"
          />
        </div>
        <div class="tw-w-1/3 tw-px-2">
          <app-filter-btn
            class="tw-w-1/3"
            v-model="type"
            val="incoming"
            label="Пополнение"
            type="radio"
          />
        </div>
      </div>

      <div v-if="date" class="tw-font-gilroy tw-text-fBlack tw-text-sm">
        <div class="tw-mb-2">
          Операции от {{ date.from | prettyDate }} по
          {{ date.to | prettyDate }}
        </div>
        <q-btn
          icon="close"
          @click="clearDate"
          rounded
          color="primary"
          label="Сбросить"
          size="sm"
        />
      </div>
    </div>

    <HomeHistoryList
      v-if="transactions"
      :transactions="transactions"
      :meta="meta"
      pagination
      @onload="upload($event)"
    />
    <app-inner-loading :showing="$wait.is('loading transactions')" />
  </q-page>
</template>

<script>
import HomeHistoryList from 'src/components/History/HomeHistoryList';
import { waitFor } from 'vue-wait';

export default {
  created() {
    this.listTransactions();
  },
  data() {
    return {
      transactions: null,
      meta: null,
      type: '',
      date: null,
    };
  },
  methods: {
    clearDate() {
      this.date = null;
    },
    makeFilter(page = null) {
      const filter = { type: 'all' };
      if (this.type) {
        filter.type = this.type;
      }

      if (this.date !== null) {
        filter.dateFrom = this.date.from;
        filter.dateTill = this.date.to;
      }

      if (page) {
        filter.page = page;
      }

      return filter;
    },
    async upload({ page = null, done }) {
      done = done || function () {};
      const filter = this.makeFilter(page);
      const { data, meta } = await this.$store.dispatch(
        'b2c/transactions/list',
        filter
      );

      done();

      this.meta = meta;
      this.transactions = [...this.transactions, ...data];
    },
    listTransactions: waitFor('loading transactions', async function () {
      const filter = this.makeFilter();
      const { data, meta } = await this.$store.dispatch(
        'b2c/transactions/list',
        filter
      );
      this.transactions = data;
      this.meta = meta;
    }),
  },
  components: {
    HomeHistoryList,
  },
  watch: {
    type() {
      this.listTransactions();
    },
    date() {
      this.listTransactions();
    },
  },
};
</script>
