<template>
  <validation-provider
    slim
    :rules="rules"
    :vid="vid"
    :name="name"
    v-slot="{ errors }"
  >
    <q-select
      v-model="innerValue"
      v-bind="$attrs"
      hide-dropdown-icon
      :error="!!errors[0]"
    >
      <template #append>
        <q-icon class="tw-mr-1" name="far fa-chevron-down" size="14px" />
      </template>
      <template #error>
        {{ errors[0] }}
      </template>
    </q-select>
  </validation-provider>
</template>

<script>
import SyncValueMixin from 'src/mixins/core/SyncValueMixin';
import ValidationMixin from 'src/mixins/core/ValidationMixin';

export default {
  props: {
    value: {
      default: '',
      type: [Object, String, Array, Number],
    },
  },
  mixins: [SyncValueMixin, ValidationMixin],
};
</script>
