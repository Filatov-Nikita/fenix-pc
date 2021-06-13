<template>
  <div class="rounded-12 preview layer tw-relative" v-if="src && !btnMode">
    <q-btn
      unelevated
      class="btn tw-text-secondary tw-bg-secondary"
      :class="is ? 'tw-bg-opacity-0' : 'tw-bg-opacity-40'"
      padding="6.5px"
      @click="remove"
      :loading="is"
    >
      <q-icon name="far fa-times" class="tw-text-secondary" size="7px" />
    </q-btn>
    <q-img
      class="rounded-12"
      width="100%"
      height="100%"
      v-bind="$attrs"
      :src="src"
    />
  </div>
  <div
    v-else-if="btnMode"
    class="rounded-12 preview tw-relative tw-bg-secondary"
    v-ripple
    v-on="$listeners"
  >
    <UIPlus />
  </div>
</template>

<script>
import UIPlus from 'src/core/UI/UIPlus';

export default {
  inheritAttrs: false,
  props: {
    src: {
      default: undefined,
      type: String,
    },
    btnMode: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    deletingName() {
      return this._uid + ':' + 'deleting';
    },
    is() {
      return this.$wait.is(this.deletingName);
    },
  },
  methods: {
    async remove() {
      this.$wait.start(this.deletingName);
      let done;
      const promise = new Promise((res, rej) => {
        done = res;
      });
      this.$emit('remove', { done, deleting: promise });
      await promise;
      this.$wait.end(this.deletingName);
    },
  },
  components: {
    UIPlus,
  },
};
</script>

<style scoped>
.preview {
  width: 78px;
  height: 78px;
}

.layer::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.btn {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 6px;
}
</style>
