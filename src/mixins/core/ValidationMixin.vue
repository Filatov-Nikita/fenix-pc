<script>
const props = {
  vid: {
    default: undefined,
    type: String,
  },
  rules: {
    default: undefined,
    type: String,
  },
  name: {
    default: undefined,
    type: String,
  },
};

function validPropsWithDefaultValues(list) {
  if (!(list instanceof Array)) return list;
  if (list.length === 0) return props;

  return list.reduce(
    (prev, current) => {
      if (!(current instanceof Array)) throw new Error('must be an array');
      if (current.length !== 2)
        throw new Error('array must consist of key and value');

      const key = current[0];
      const value = current[1];

      if (key in props) {
        prev[key] = {
          ...prev[key],
          default: value,
        };
      }
      return prev;
    },
    { ...props }
  );
}
export default {
  props,
  computed: {
    validationProps() {
      const { vid, rules, name } = this;
      return { vid, rules: this.inputRules, name };
    },
    inputRules() {
      const unchangeRules = this.unchangeRules;
      if (this.unchangeRules !== undefined) {
        if (this.rules !== undefined) {
          return this.rules + '|' + this.unchangeRules;
        }
        return this.unchangeRules;
      }
      return this.rules;
    },
  },
};

export { validPropsWithDefaultValues };
</script>
