<template>
  <validation-provider
    ref="provider"
    tag="div"
    v-slot="{ errors }"
    v-bind="validationProps"
  >
    <label class="rounded-10 tw-flex tw-p-5 container">
      <div class="tw-w-full">
        <div class="label">{{ label }}</div>
        <input
          ref="input"
          class="input"
          type="text"
          @keypress="keydown"
          v-model="innerValue"
          v-bind="$attrs"
          placeholder="0"
        />
      </div>
      <img class="tw-ml-4" :src="imgPurpose" />
    </label>
    <div v-if="!!errors[0]" class="tw-text-negative">{{ errors[0] }}</div>
  </validation-provider>
</template>

<script>
import ValidationMixin, {
  validPropsWithDefaultValues,
} from 'src/mixins/core/ValidationMixin';
import SyncValueMixin from 'src/mixins/core/SyncValueMixin';

export default {
  mounted() {
    this.provider = this.$refs.provider;
  },
  props: {
    label: {
      required: true,
      type: String,
    },
    purpose: {
      default: 'fenix',
      type: String,
    },
    ...validPropsWithDefaultValues([
      ['rules', 'required|decimal:4'],
      ['vid', 'fenix_amount'],
      ['name', 'сумма'],
    ]),
  },
  data() {
    return {
      val: '',
      provider: null,
    };
  },
  mixins: [ValidationMixin, SyncValueMixin],
  computed: {
    imgPurpose() {
      switch (this.purpose) {
        case 'fenix':
          return 'images/fenix.svg';
        case 'fenix:fenix':
          return 'images/purpose/fenix-fenix.svg';
        case 'card:fenix':
          return 'images/purpose/card-fenix.svg';
      }
    },
  },
  methods: {
    cleanValue(value) {
      return value.replace(/[^\d]/gi, '');
    },
    keydown(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.container {
  background: theme('colors.secondary');
}

.label {
  color: #979797;
  @apply tw-font-gilroy tw-text-xs;
}

.input {
  font-size: 26px;
  color: #1a1a1a;
  @apply tw-font-medium tw-block tw-w-full;
}
</style>
