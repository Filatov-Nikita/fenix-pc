<template>
  <div class="tw-bg-secondary tw-py-8 tw-px-6 history">
    <app-go-to-link class="tw-mb-8" :to="{ name: 'history' }" title="История" />
    <HomeHistoryList :transactions="transactions" />
    <app-button
      class="tw-mt-6 btn"
      label="Перейти к истории"
      design="bordered"
      @click="$router.push({ name: 'history' })"
    />
  </div>
</template>

<script>
import HomeHistoryList from 'src/components/History/HomeHistoryList';

export default {
  props: {
    transactions: {
      required: true,
      type: Array,
    },
  },
  components: {
    HomeHistoryList,
  },
};
</script>

<style scoped>
.history {
  border-radius: 26px 26px 0px 0px;
}

.btn {
  color: #75747e;
  border-color: #d6d6d6;
}
</style>
