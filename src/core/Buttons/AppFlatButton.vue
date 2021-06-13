<template>
  <button
    class="tw-font-gilroy tw-font-semibold tw-text-sm"
    :class="colorClass"
    v-on="$listeners"
    :type="type"
  >
    <template v-if="hasLabel">{{ label }}</template>
    <slot v-if="!hasLabel && hasSlot" />
  </button>
</template>

<script>
export default {
  props: {
    label: {
      default: undefined,
      type: String,
    },
    color: {
      default: 'primary',
      type: String,
    },
    type: {
      default: 'button',
      type: String,
    },
  },
  computed: {
    hasLabel() {
      return this.label !== undefined;
    },
    hasSlot() {
      return !!this.$slots.default;
    },
    colorClass() {
      return 'tw-text-' + this.color;
    },
  },
};
</script>
