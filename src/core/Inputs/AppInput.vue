<template>
  <validation-provider
    v-bind="{ ...validationProps, ...inputValidationProps }"
    slim
    v-slot="{ errors }"
  >
    <q-input
      :color="color"
      v-model="innerValue"
      v-bind="attrs"
      :error="error === undefined ? !!errors[0] : error"
      input-class="app--input"
      class="app--input-q-filed"
    >
      <template #error>
        <slot v-if="hasErrorSlot" name="error" />
        <span v-if="!hasErrorSlot">{{ errors[0] }}</span>
      </template>
      <template #append> <slot name="append" /></template>
    </q-input>
  </validation-provider>
</template>

<script>
import SyncValueMixin from 'src/mixins/core/SyncValueMixin';
import ValidationMixin from 'src/mixins/core/ValidationMixin';

export default {
  props: {
    color: {
      default: 'primary',
      type: String,
    },
    hint: {
      default: undefined,
      type: String,
    },
    error: {
      default: undefined,
      type: Boolean,
    },
    label: {
      required: true,
      type: String,
    },
  },
  mixins: [SyncValueMixin, ValidationMixin],
  computed: {
    inputValidationProps() {
      if (this.name === undefined) return { name: this.label.toLowerCase() };
      return { name: this.name };
    },
    attrs() {
      const attrs = { ...this.$attrs, label: this.label };
      if (this.hasHint) {
        return {
          hint: this.hint,
          ...attrs,
        };
      }
      return attrs;
    },
    hasErrorSlot() {
      return !!this.$slots.error;
    },
    hasAppend() {
      return !!this.$slots.append;
    },
    hasHint() {
      return this.hint !== undefined;
    },
  },
};
</script>
<style>
.app--input {
  color: #979797;
  @apply tw-font-gilroy tw-text-base;
}

/* .app--input-q-filed .q-field__label {
  color: #979797;
  @apply tw-font-gilroy;
  font-size: 12px;
} */
</style>
