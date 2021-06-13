<template>
  <app-input
    :label="label"
    v-model="innerValue"
    mask="##.##.####"
    v-bind="{ ...$attrs, ...validationProps }"
  >
    <template #append>
      <q-icon name="far fa-chevron-down" class="cursor-pointer" size="14px">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date v-model="innerValue" mask="DD.MM.YYYY">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Закрыть" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
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
      required: true,
      type: String,
    },
  },
  computed: {
    unchangeRules() {
      return 'dateformat';
    },
  },
  mixins: [SyncValueMixin, ValidationMixin],
};
</script>
