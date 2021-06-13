<template>
  <router-link
    v-bind="$attrs"
    class="tw-flex tw-items-center tw-justify-between"
  >
    <div class="tw-text-fBlack tw-font-semibold tw-font-gilroy tw-text-base">
      {{ title }}
    </div>
    <q-icon name="far fa-chevron-right" />
  </router-link>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      required: true,
      type: String,
    },
  },
};
</script>

<style>
</style>
