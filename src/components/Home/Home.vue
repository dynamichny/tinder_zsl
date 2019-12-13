<template>
  <div class="home">
    <nav>
      <img :src="require(`@/assets/profile${state == 0 ? '_colored' : ''}.svg`)" @click="state = 0" />
      <img
        :src="require(`@/assets/logo${state == 1 ? '_colored' : ''}.svg`)"
        style="width: 70px;"
        @click="state = 1"
      />
      <img
        :src="require(`@/assets/chat${state == 2 ? '_colored' : ''}.svg`)"
        style="width: 50px;"
        @click="state = 2"
      />
    </nav>
    <MyProfile v-if="state === 0" />
    <Swipes v-if="state === 1" />
    <transition name="slide">
      <More :data="moreData" v-if="isMore" />
    </transition>
  </div>
</template>

<script>
import MyProfile from "./MyProfile/MyProfile.vue";
import Swipes from "./Swipes/Swipes.vue";
import db from "@/components/firebaseInit.js";
import store from "@/store/index";
import More from '@/components/Home/Swipes/More.vue';

export default {
  name: "Home",
  components: {
    MyProfile,
    Swipes,
    More,
  },
  data() {
    return {
      state: 1
    };
  },
  computed: {
    isMore(){
      return store.state.isMore;
    },
    moreData(){
      return store.state.moreData;
    }
  },
  mounted() {
    db.collection("users")
      .get()
      .then(res => {
        let resultsArray = res.docs.map(x => x.data());
        store.commit("setMatches", resultsArray);
      });
  }
};
</script>

<style scoped lang='scss'>
.home {
  background: #f5f7fa;
  height: 100vh;
  width: 100vw;
  padding: 60px 0 0;
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;
}
nav {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: white;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
  img {
    height: 40px;
  }
}
.slide-enter-active, .slide-leave-active {
  transition: all .5s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
  transform: translateX(100vw);
}
</style>