<template>
  <div
    class="tw-text-xs tw-font-gilroy tw-font-semibold"
    :class="`tw-text-${verifiedClassPostfix}`"
  >
    <div
      class="tw-inline-block tw-align-middle icon tw-leading-none text-none tw-p-1"
      :class="`tw-bg-${verifiedClassPostfix}`"
    >
      <q-icon
        :name="isVerify ? 'fas fa-check' : 'fas fa-question'"
        class="tw-text-secondary"
        size="5px"
      />
    </div>
    <span class="tw-align-middle tw-ml-1">
      {{ isVerify ? 'Подтвержден' : 'Неподтвержден' }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    verified: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    verifiedClassPostfix() {
      return this.isVerify ? 'positive' : 'negative';
    },
    isVerify() {
      return this.verified;
    },
  },
};
</script>

<style scoped>
.icon {
  border-radius: 3px;
}
</style>
