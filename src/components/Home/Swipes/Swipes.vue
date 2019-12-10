<template>
  <div class="swipes">
    <transition-group name="slide">
      <Poster v-for="(person, index) in matches " :key="person.email" :position="index" :data="person" />
    </transition-group>
  </div>
</template>

<script>
import Poster from './Poster.vue';
import store from '@/store/index';

export default {
  name: 'Swipes',
  components: {
    Poster,
  },
  computed: {
    matches(){
      return store.state.matches.slice(0, 4);
    },
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
.slide-enter-active {
  transform-origin: top;
  transition: transform 1s;
}
.slide-enter, .slide-leave-to{
  transform-origin: top;
  transform: translateY(-10px);
}
</style>