<template>
  <transition-group appear enter-active-class="animated fadeIn" tag="div">
    <div v-if="loading" key="loading">
      <slot name="loading" />
    </div>
    <div v-else-if="list" key="list">
      <slot v-if="list.length <= 0" name="empty" />
      <q-infinite-scroll
        @load="onLoad"
        :offset="350"
        :disable="!canLoad"
        ref="paginationRef"
        v-else-if="pagination"
      >
        <slot />
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
      <slot v-else />
    </div>
  </transition-group>
</template>

<script>
export default {
  props: {
    list: {
      default: null,
      type: Array,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    pagination: {
      default: false,
      type: Boolean,
    },
    meta: {
      default: undefined,
      type: Object,
    },
    links: {
      default: undefined,
      type: Object,
    },
  },
  computed: {
    canLoad() {
      if (!this.meta) return false;
      const { current_page, last_page } = this.meta;
      return current_page < last_page;
    },
  },
  methods: {
    onLoad(index, done) {
      if (this.canLoad) {
        this.$emit('onload', { page: ++this.meta.current_page, done });
      }
    },
  },
};
</script>
