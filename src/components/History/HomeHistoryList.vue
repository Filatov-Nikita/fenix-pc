<template>
  <app-list
    :list="transactions"
    :pagination="pagination"
    :meta="meta"
    @onload="onload"
  >
    <template #empty>
      <div class="tw-text-center empty tw-mt-20">
        <img src="images/empty-history.svg" class="tw-mb-4 tw-mx-auto" />
        <div>Здесь будет история ваших операций</div>
      </div>
    </template>
    <div class="q-gutter-y-sm">
      <HomeHistoryItem
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>
  </app-list>
</template>

<script>
import HomeHistoryItem from './HomeHistoryItem';

export default {
  props: {
    transactions: {
      required: true,
      type: Array,
    },
    meta: {
      default: undefined,
      validator(meta) {
        return meta === null || typeof meta === 'object';
      },
    },
    pagination: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    onload(e) {
      this.$emit('onload', e);
    },
  },
  components: {
    HomeHistoryItem,
  },
};
</script>

<style scoped>
.empty {
  color: #c0c0c0;
}
</style>
