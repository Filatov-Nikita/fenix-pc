<template>
  <div class="dashed rounded-10 tw-p-4 tw-font-gilroy tw-text-sm" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      default: 'negative',
      type: String,
    },
  },
  computed: {
    classes() {
      const prefix = 'tw-';
      return prefix + 'border-negative text-negative'
    }
  }
};
</script>
