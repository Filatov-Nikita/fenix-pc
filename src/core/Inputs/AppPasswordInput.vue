<template>
  <app-input
    v-bind="{ ...$attrs, ...validationProps }"
    :label="label"
    :type="isPwd ? 'password' : 'text'"
    v-model="innerValue"
  >
    <template #append>
      <q-icon
        size="xs"
        :name="isPwd ? 'fas fa-eye' : 'fas fa-eye-slash'"
        class="cursor-pointer tw-mr-1"
        @click="isPwd = !isPwd"
      />
    </template>
  </app-input>
</template>

<script>
import SyncValueMixin from 'src/mixins/core/SyncValueMixin';
import ValidationMixin, {
  validPropsWithDefaultValues,
} from 'src/mixins/core/ValidationMixin';

export default {
  props: {
    label: {
      default: 'Пароль',
      type: String,
    },
    ...validPropsWithDefaultValues([
      ['vid', 'password'],
      ['name', 'пароль'],
    ]),
  },
  data() {
    return {
      isPwd: true,
    };
  },
  mixins: [SyncValueMixin, ValidationMixin],
};
</script>
