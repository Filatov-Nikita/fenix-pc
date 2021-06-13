<template>
  <validation-provider
    ref="provider"
    tag="div"
    v-slot="{ errors }"
    v-bind="validationProps"
  >
    <transition
      appear
      leave-active-class="animated zoomOut"
      enter-active-class="animated zoomIn"
    >
      <app-file-input
        v-show="!hideInput"
        :multiple="multiple"
        :rules="rules"
        :hint="hint"
        :label="label"
        :name="name"
        ref="input"
        accept="image/*"
        @input="change"
      />
    </transition>
    <app-image-preview-list
      :urls="urls"
      :fileUrls="urlsList"
      :hint="hint"
      :label="label"
      :multiple="multiple"
      @addImage="addImage"
      @remove="remove"
    />
    <div
      v-if="!!errors[0]"
      class="tw-font-gilroy tw-text-negative tw-text-xs tw-mt-1"
    >
      {{ errors[0] }}
    </div>
  </validation-provider>
</template>

<script>
import AppImagePreviewList from '../ImagePreview/AppImagePreviewList.vue';
import ValidationMixin from 'src/mixins/core/ValidationMixin';

const fileId = 0;

export default {
  props: {
    urls: {
      default: undefined,
      type: Array,
    },
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
  data() {
    const data = {
      filesData: null,
    };

    if (this.urls !== undefined) {
      data.filesData = this.urls.map((url) => ({ url, file: null }));
    }
    return data;
  },
  mixins: [ValidationMixin],
  computed: {
    hideInput() {
      if (this.multiple) {
        return this.filesData && this.filesData.length > 0;
      }
      return !!this.filesData;
    },
    files() {
      return this.takeFileProp('file');
    },
    urlsOfFiles() {
      return this.takeFileProp('url');
    },
    urlsList() {
      if (!this.urlsOfFiles) return this.urlsOfFiles;
      if (!this.multiple) return [this.urlsOfFiles];
      return this.urlsOfFiles;
    },
  },
  methods: {
    takeFileProp(prop) {
      if (!this.filesData) return this.filesData;
      if (!this.multiple) return this.filesData[prop];
      return this.filesData.map((fileObj) => fileObj[prop]);
    },
    addImage() {
      this.$refs.input.click();
    },
    async change(files) {
      const valid = await this.$refs.provider.validate(files);
      if (!valid) return;

      let filesData = Array.from(files).map((file) => ({
        url: this.createImageUrl(file),
        file,
      }));

      if (!this.multiple) {
        filesData = filesData[0];
      } else {
        if (filesData.length > 0) {
          const currentFiles = this.filesData || [];
          filesData = [...currentFiles, ...filesData];
        }
      }

      this.filesData = filesData;
      this.$emit('input', this.files);
      this.$refs.input.naitive.value = '';
    },
    isFile(file) {
      return 'File' in window && file instanceof File;
    },
    createImageUrl(file) {
      if (!this.isFile(file)) throw new Error('file is not file');
      return URL.createObjectURL(file);
    },
    async remove({ url, delObj }) {
      let deletedFileObj = null;
      let filesData;
      if (this.multiple) {
        filesData = this.filesData.filter((fileObj) => {
          if (fileObj.url === url) {
            deletedFileObj = fileObj;
          }
          return fileObj.url !== url;
        });
      } else {
        deletedFileObj = this.filesData;
        filesData = [];
      }

      if (!deletedFileObj) return;
      if (deletedFileObj.file === null) {
        this.$emit('removeUploadedImg', delObj.done);
        await delObj.deleting;
      } else {
        URL.revokeObjectURL(url);
        delObj.done();
      }

      if (filesData && filesData.length <= 0) {
        this.filesData = null;
      } else {
        this.filesData = filesData;
      }

      this.$emit('input', this.files);
    },
  },
  components: { AppImagePreviewList },
};
</script>
