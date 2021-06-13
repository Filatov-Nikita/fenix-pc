<template>
  <div class="tw-flex item tw-py-3">
    <div>
      <q-avatar width="45px" height="45px" rounded class="tw-mr-4">
        <q-img :src="partner.avatar" />
      </q-avatar>
    </div>
    <div class="middle">
      <div
        class="tw-font-gilroy tw-font-semibold tw-text-base tw-text-fBlack tw-mb-1"
      >
        {{ partner.name }}
      </div>
      <div class="tw-text-fBlack tw-text-opacity-70 tw-text-xs">
        {{ transaction.incoming ? 'Входящий' : 'Исходящий' }} платеж
      </div>
    </div>
    <div
      class="last tw-font-gilroy tw-font-semibold tw-text-base"
      :class="transaction.incoming ? ' tw-text-positive' : 'tw-text-fBlack'"
    >
      {{ amountLabel }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      required: true,
      type: Object,
    },
  },
  computed: {
    partner() {
      return this.transaction.partner;
    },
    amountLabel() {
      if (this.transaction.incoming) {
        return `+${this.transaction.amount} F`;
      }
      return `-${this.transaction.amount} F`;
    },
  },
};
</script>

<style scoped>
.item {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.middle {
  flex-basis: 168px;
  flex-grow: 1;
}

.last {
  flex-basis: 134px;
  text-align: right;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
