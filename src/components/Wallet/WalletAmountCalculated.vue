<template>
  <div class="rounded-10 item tw-p-4 tw-text-center tw-text-sm">
    <div class="tw-flex tw-items-center tw-justify-center">
      <template v-if="!loading">
        <template v-if="from && to">
          <div>{{ from | prettyAmount }}</div>
          <q-icon name="fal fa-long-arrow-right" class="tw-mx-2" />
          <div>{{ to }}</div>
        </template>
      </template>
      <q-spinner v-else class="tw-text-sm" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.item {
  background: #e9e9e9;
  color: #9a9a9d;
}
</style>
