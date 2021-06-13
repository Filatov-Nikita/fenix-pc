<template>
  <button
    class="button bord"
    :class="classes"
    v-on="$listeners"
    :disabled="loading"
    v-ripple
  >
    <slot v-if="hasSlot" />
    <span v-if="!hasSlot && hasLabel">{{ label }}</span>
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
    loading: {
      default: false,
      type: Boolean,
    },
    paddingClasses: {
      default: 'tw-py-5',
      type: String,
    },
    dashed: {
      default: false,
      type: Boolean,
    },
    design: {
      default: 'classic',
      type: String,
      validator(value) {
        const availableDesign = ['classic', 'bordered'];
        return availableDesign.includes(value);
      },
    },
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    },
    hasLabel() {
      return this.label !== undefined;
    },
    classes() {
      if (this.design === 'classic') {
        return `tw-bg-${this.color} tw-text-secondary tw-py-5 tw-py-4`;
      }
      if (this.design === 'bordered') {
        return `bordered tw-py-5 tw-py-4 ${this.dashed ? 'tw-border-dashed' : 'tw-border-solid'}`;
      }
    },
  },
};
</script>
<style scoped>
.button {
  border-radius: 10px;
  @apply tw-relative tw-w-full tw-font-gilroy tw-font-semibold tw-text-base;
}

.bordered {
  border-width: 1px;
  border-color: #bbbbbb;
  color: #979797;
}
</style>
