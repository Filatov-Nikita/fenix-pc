<template>
  <div class="main tw-rounded-full tw-relative tw-bg-gray"
    :class="[src ? 'img' : 'tw-bg-gray']"
  >
    <q-icon name="app:profile" size="42px" v-if="!src"
      class=" tw-absolute tw-top-1/2 tw-left-1/2 position tw-rounded-full"
    />

    <div class="bg tw-rounded-full " v-if="edit">
      <q-btn round flat
        class=" tw-absolute tw-top-1/2 tw-left-1/2 position"
      >
        <q-icon name="app:camera" size="60px"></q-icon>
      </q-btn>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .img{
    background-image: url('/images/osel.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: inline-block;
  }
  .position{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .main {
    width: 100px;
    height: 100px;
    display: block;
  }
  .bg{
    width: 100px;
    height: 100px;
    display: block;
    background: rgba($color: #000000, $alpha: 0.4);
  }
</style>
