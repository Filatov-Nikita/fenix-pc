<template>
  <router-link
    :to="{ name: action.to }"
    tag="div"
    class="item rounded-22 tw-flex tw-items-center tw-flex-col tw-cursor-pointer tw-relative"
    v-ripple
  >
    <div
      class="icon tw-rounded-full tw-text-opacity-80 tw-flex tw-items-center tw-justify-center"
    >
      <q-img :src="action.iconPath" width="20px" />
    </div>
    <div class="tw-font-gilroy tw-font-semibold tw-mt-3">{{ action.label }}</div>
  </router-link>
</template>

<script>
export default {
  props: {
    action: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped>
.item {
  color: #25273a;
  @apply tw-bg-secondary tw-p-5;
}

.icon {
  background: #f0f0f8;
  width: 53px;
  height: 53px;
}
</style>
