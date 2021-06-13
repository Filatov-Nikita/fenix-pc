<template>
  <button
    class="tw-p-3 tw-border tw-border-dashed tw-w-full btn"
    :class="{ 'btn-active': selected }"
    @click="click"
  >
    {{ label }}
    <template v-if="type === 'date'">
      <q-icon name="event" class="cursor-pointer tw-ml-1">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date :value="value" @input="inputDate" range mask="YYYY-MM-DD">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Закрыть" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
      <q-icon
        v-if="value"
        name="close"
        @click.stop="clearDate"
        class="tw-ml-1"
      />
    </template>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String,
    },
    value: {
      validator(value) {
        if (value instanceof Array) return true;
        if (value === null) return true;
        if (typeof value === 'object') return true;
        if (typeof value === 'string') return true;
        return false;
      },
    },
    type: {
      required: true,
      type: String,
      validator(type) {
        const availableTypes = ['checkbox', 'date', 'radio'];
        return availableTypes.includes(type);
      },
    },
    val: {
      type: String,
    },
  },
  data() {
    if (this.typeLocal === 'date') {
      return {
        date: null,
      };
    }
    return {};
  },
  computed: {
    typeLocal() {
      if (typeof this.value === 'string' && this.type === 'radio')
        return 'radio';
      if (this.isArrayValue && this.type === 'checkbox') return 'checkbox';

      return this.type;
    },
    selected() {
      if (this.typeLocal === 'checkbox') {
        if (this.isArrayValue) {
          if (this.val && typeof this.val === 'string') {
            return this.value.includes(this.val);
          }
        }
      }

      if (this.typeLocal === 'date') {
        return !!this.value;
      }

      if (this.typeLocal === 'radio') {
        return this.value === this.val;
      }

      return false;
    },
    isArrayValue() {
      return this.value instanceof Array;
    },
  },
  methods: {
    click() {
      if (this.typeLocal === 'date') {
        this.$refs.qDateProxy.show();
      } else {
        this.input();
      }
    },
    clearDate() {
      this.$emit('input', null);
    },
    inputDate(value) {
      this.$emit('input', value);
    },
    input() {
      if (this.typeLocal === 'checkbox') {
        if (this.selected) {
          const value = this.value.filter((current) => current !== this.val);
          this.$emit('input', value);
        } else {
          this.$emit('input', [...this.value, this.val]);
        }
      }

      if (this.typeLocal === 'radio') {
        if (this.selected) {
          this.$emit('input', '');
        } else {
          this.$emit('input', this.val);
        }
      }
    },
  },
};
</script>
<style scoped>
.btn {
  border-radius: 8px;
  border-color: #adadb4;
  color: #333144;
  @apply tw-font-semibold tw-font-gilroy tw-text-xs;
}

.btn-active {
  @apply tw-text-primary tw-border-primary;
}
</style>
