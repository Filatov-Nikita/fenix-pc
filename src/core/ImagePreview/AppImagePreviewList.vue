<template>
  <transition
    appear
    leave-active-class="animated fadeOut"
    enter-active-class="animated zoomIn"
  >
    <div v-if="hasAtLeastOneFile">
      <div v-if="hasLabel" class="app-hint tw-uppercase tw-mb-3">
        {{ label }}
      </div>
      <transition-group
        key="list"
        tag="div"
        class="tw-flex tw-flex-wrap tw--mx-1 q-gutter-y-sm"
        leave-active-class="animated zoomOut"
        enter-active-class="animated zoomIn"
      >
        <div class="tw-px-1" v-for="url in fileUrls" :key="'image:' + url">
          <app-image-preview-item
            :src="url"
            @remove="remove(url, $event)"
          />
        </div>
        <div v-if="multiple" class="tw-px-1" key="add">
          <app-image-preview-item btnMode @click="addImage" />
        </div>
      </transition-group>
      <div v-if="hasHint" class="app-hint tw-mt-3">{{ hint }}</div>
    </div>
  </transition>
</template>

<script>
import AppImagePreviewItem from './AppImagePreviewItem';

export default {
  props: {
    urls: {
      default: undefined,
      type: Array,
    },
    fileUrls: {},
    hint: {
      default: undefined,
      type: String,
    },
    label: {
      default: undefined,
      type: String,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    hasHint() {
      return this.hint !== undefined;
    },
    hasLabel() {
      return this.label !== undefined;
    },
    hasAtLeastOneFile() {
      return this.fileUrls && this.fileUrls.length > 0;
    },
  },
  methods: {
    addImage() {
      this.$emit('addImage');
    },
    remove(url, delObj) {
      this.$emit('remove', { url, delObj });
    },
  },
  components: {
    AppImagePreviewItem,
  },
};
</script>
