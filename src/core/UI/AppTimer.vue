<template>
  <div
    class="tw-font-gilroy tw-text-fGray tw-text-sm tw-font-medium tw-text-center"
  >
    <span v-if="!!title">{{ title }}</span>
    <span>{{ time }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: undefined,
      type: String,
    },
    start: {
      default: 60,
      type: Number,
    },
  },
  created() {
    this.startTimer();
  },
  data() {
    return {
      time: this.start,
      interval: null,
    };
  },
  methods: {
    startTimer() {
      if (!!this.interval) this.stopTimer();
      this.interval = setInterval(() => this.tick(), 1000);
      this.$emit('started');
    },
    stopTimer() {
      clearInterval(this.interval);
      this.interval = null;
    },
    tick() {
      this.time--;
      this.$emit('tick', this.time);

      if (this.time <= 0) {
        this.stopTimer();
        this.$emit('finished');
      }
    },
  },
};
</script>
