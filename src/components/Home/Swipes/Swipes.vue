<template>
  <div class="swipes">
    <Poster />
  </div>
</template>

<script>
import Poster from './Poster.vue';

export default {
  name: 'Swipes',
  components: {
    Poster,
  }
};
</script>

<style scoped lang='scss'>
.swipes{
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>