<template>
  <div class="tw-flex tw--mx-2">
    <div
      class="tw-w-1/3 tw-px-2"
      v-for="(action, index) in actions"
      :key="index"
    >
      <HomeActionsItem :action="action" />
    </div>
  </div>
</template>

<script>
import HomeActionsItem from './HomeActionsItem';

export default {
  props: {
    actions: {
      required: true,
      type: Array,
    },
  },
  components: {
    HomeActionsItem,
  },
};
</script>
