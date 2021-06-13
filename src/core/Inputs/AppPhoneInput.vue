<template>
  <validation-provider
    slim
    v-bind="validationProps"
    v-slot="{ valid, failedRules, errors }"
  >
    <app-input
      label="Номер телефона"
      :color="valid ? 'positive' : 'primary'"
      :class="valid ? 'q-field--focused q-field--float' : ''"
      unmasked-value
      v-model="innerValue"
      :error="!!errors[0]"
      @input.native="addPrefix"
    >
      <template #error> {{ errors[0] }} </template>
      <template v-if="valid" #append>
        <q-icon name="fas fa-check-circle" class="tw-text-positive" size="xs" />
      </template>
    </app-input>
  </validation-provider>
</template>

<script>
import SyncValueMixin from 'src/mixins/core/SyncValueMixin';
import ValidationMixin, {
  validPropsWithDefaultValues,
} from 'src/mixins/core/ValidationMixin';

export default {
  props: {
    ...validPropsWithDefaultValues([
      ['vid', 'cellphone'],
      ['name', 'номер телефона'],
    ]),
  },
  mixins: [SyncValueMixin, ValidationMixin],
  computed: {
    unchangeRules() {
      return 'max:16';
    },
  },
  methods: {
    addPrefix(e) {
      e.target.value = e.target.value.replace(/[^\d]/gi, '');
      const value = e.target.value;
      this.innerValue = value;
      if (!value.match(/\+/) && value.length !== 0) {
        this.innerValue = '+' + value;
      }
    },
  },
};
</script>
