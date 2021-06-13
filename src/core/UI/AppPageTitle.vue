<template>
  <div :class="containerClasses">
    <div class="app-title-4">
      <span v-if="hasTitle && !hasTitleSlot">{{ title }}</span>
      <slot v-if="hasTitleSlot" name="left" />
    </div>
    <div v-if="hasRightSlot">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: undefined,
      type: String,
    },
  },
  computed: {
    containerClasses() {
      if (this.hasRightSlot) {
        return 'tw-flex tw-justify-between';
      }
      return '';
    },
    hasTitle() {
      return this.title !== undefined;
    },
    hasTitleSlot() {
      return !!this.$slots.title;
    },
    hasRightSlot() {
      return !!this.$slots.right;
    },
  },
};
</script>
