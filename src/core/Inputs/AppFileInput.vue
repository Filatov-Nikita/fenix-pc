<template>
  <validation-provider
    tag="div"
    v-slot="{ validate, errors }"
    v-bind="validationProps"
  >
    <div v-if="hasLabel" class="app-hint tw-uppercase tw-mb-3">{{ label }}</div>
    <div class="rounded-12 tw-bg-eGray input-btn tw-relative">
      <UIPlus />
      <input
        v-bind="$attrs"
        class="tw-opacity-0 tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0 tw-cursor-pointer"
        type="file"
        ref="input"
        @change="change($event, validate)"
      />
    </div>
    <div v-if="hasHint" class="app-hint tw-mt-3">{{ hint }}</div>
    <transition appear enter-active-class="animated shakeX">
      <div
        v-if="!!errors[0]"
        class="tw-font-gilroy tw-text-negative tw-text-xs tw-mt-1"
      >
        {{ errors[0] }}
      </div>
    </transition>
  </validation-provider>
</template>

<script>
import UIPlus from 'src/core/UI/UIPlus';
import ValidationMixin from 'src/mixins/core/ValidationMixin';

export default {
  inheritAttrs: false,
  props: {
    value: {
      default: null,
    },
    hint: {
      default: undefined,
      type: String,
    },
    label: {
      default: undefined,
      type: String,
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
  data: () => ({
    innerValue: null,
    naitive: undefined,
  }),
  mounted() {
    this.naitive = this.$refs.input;
  },
  computed: {
    hasHint() {
      return this.hint !== undefined;
    },
    hasLabel() {
      return this.label !== undefined;
    },
  },
  methods: {
    async change(e, validate) {
      const { valid } = await validate(e.target.files);
      if (!valid) return;

      const list = Array.from(e.target.files);
      if (list.length > 0) {
        this.innerValue = list;
      }
    },
    click() {
      this.$refs.input.click();
    },
  },
  mixins: [ValidationMixin],
  watch: {
    innerValue(value) {
      this.$emit('input', value);
    },
    value(value) {
      if (value !== this.innerValue) {
        this.innerValue = value;
      }
    },
  },
  components: {
    UIPlus,
  },
};
</script>

<style scoped>
.input-btn {
  height: 62px;
}
</style>
