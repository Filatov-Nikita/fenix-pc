<template>
  <div class="rounded-22 tw-bg-secondary tw-px-2 tw-pb-2 tw-pt-4">
    <app-go-to-link
      class="tw-mb-6 tw-px-4"
      :to="{ name: 'main' }"
      tag="div"
      title="Текущий курс феникса"
    />
    <div class="items rounded-16 tw-px-5 tw-py-4">
      <div class="tw-flex tw-flex-wrap q-gutter-y-md tw--mx-2">
        <div v-for="currency in currencies" class="currency">
          <div class="title tw-mb-1">1 феникс</div>
          <div class="subtitle">{{ currency.exchange_rate.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currencies: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style scoped>
.title {
  @apply tw-text-opacity-40 tw-text-fBlack tw-font-gilroy tw-font-semibold tw-text-xs;
}

.subtitle {
  font-size: 22px;
  @apply tw-font-semibold tw-text-fBlack tw-font-gilroy;
}

.currency {
  flex-basis: theme('width.1/3');
  @apply tw-px-2;
}

.items {
  background: #f5f5fa;
}
</style>
