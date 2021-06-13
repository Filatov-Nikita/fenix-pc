<template>
  <div class="tw-flex tw-justify-between tw-items-center">
    <div>
      <q-btn
        v-if="!hasLeftSlot"
        flat
        size="9px"
        round
        icon="fas fa-chevron-left"
        :class="colorClass"
        @click="back"
      />
      <slot v-if="hasLeftSlot" name="left" />
    </div>
    <div v-if="hasMiddleSlot || hasMiddle">
      <span
        v-if="hasMiddle && !hasMiddleSlot"
        class="tw-font-gilroy tw-font-medium tw-text-base"
        :class="colorClass"
        >{{ middle }}</span
      >
      <slot v-else name="middle" />
    </div>
    <div v-if="hasRightSlot">
      <slot name="right" />
    </div>
    <div
      v-if="(hasMiddleSlot || hasMiddle) && !hasRightSlot"
      class="tw-opacity-0"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    middle: {
      default: undefined,
      type: String,
    },
    backTo: {
      default: undefined,
      type: [String, Object],
    },
    color: {
      default: 'fBlack',
      type: String,
    },
  },
  computed: {
    hasMiddle() {
      return this.middle !== undefined;
    },
    hasMiddleSlot() {
      return !!this.$slots.middle;
    },
    hasRightSlot() {
      return !!this.$slots.right;
    },
    hasLeftSlot() {
      return !!this.$slots.left;
    },
    colorClass() {
      return 'tw-text-' + this.color;
    },
  },
  methods: {
    back() {
      if (this.backTo !== undefined) {
        if (typeof this.backTo === 'string') {
          return this.$router.push({ name: this.backTo });
        } else {
          return this.$router.push(this.backTo);
        }
      }

      this.$emit('back');
    },
  },
};
</script>
