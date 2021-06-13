<script>
export default {
  props: {
    value: {
      default: '',
      type: String,
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
  data: () => ({
    innerValue: '',
  }),
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
};
</script>
