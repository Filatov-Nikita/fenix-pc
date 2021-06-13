<template>
  <validation-provider
    tag="label"
    class="tw-block"
    v-slot="{ errors }"
    v-bind="validationProps"
  >
    <div class="rounded-10 tw-bg-secondary tw-p-5">
      <div
        class="label animated"
        :class="{ error: hasError(errors), shakeX: hasError(errors) }"
      >
        <q-icon class="icon tw-mr-2" name="fas fa-wallet" size="18px" />
        <span class="label-text">Номер кошелька</span>
      </div>
      <TheMask
        class="input tw-mt-3"
        v-model="innerValue"
        mask="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        placeholder="00000000 0000 0000 0000 000000000000"
        masked
      />
    </div>
    <div
      v-if="hasError(errors)"
      class="tw-text-negative tw-font-gilroy tw-text-xs tw-mt-1"
    >
      {{ errors[0] }}
    </div>
  </validation-provider>
</template>

<script>
import SyncValueMixin from 'src/mixins/core/SyncValueMixin';
import { TheMask } from 'vue-the-mask';
import ValidationMixin, {
  validPropsWithDefaultValues,
} from 'src/mixins/core/ValidationMixin';

export default {
  props: {
    ...validPropsWithDefaultValues([
      ['rules', 'required'],
      ['name', 'номер кошелька'],
    ]),
  },
  mixins: [SyncValueMixin, ValidationMixin],
  computed: {
    hasError() {
      return (errors) => {
        return !!errors[0];
      };
    },
  },
  components: {
    TheMask,
  },
};
</script>

<style scoped>
.error > .icon,
.error > .label-text {
  color: theme('colors.negative') !important;
}
.icon {
  color: #141414;
}

.label {
  display: flex;
  align-items: center;
}

.label-text {
  color: #5f5f5f;
  text-transform: uppercase;
  font-size: 12px;
  @apply tw-font-gilroy tw-leading-none;
}

.input {
  color: #1a1a1a;
  display: block;
  width: 100%;
  @apply tw-font-gilroy tw-text-sm;
}
</style>
