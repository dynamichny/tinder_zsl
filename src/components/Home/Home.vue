<template>
  <div class="home">
    <nav>
      <img :src="require(`@/assets/profile${state == 0 ? '_colored' : ''}.svg`)" @click="state = 0">
      <img :src="require(`@/assets/logo${state == 1 ? '_colored' : ''}.svg`)" style="width: 70px;" @click="state = 1">
      <img :src="require(`@/assets/chat${state == 2 ? '_colored' : ''}.svg`)" style="width: 50px;" @click="state = 2">
    </nav>
  <MyProfile v-if="state === 0"/>
  <Swipes v-if="state === 1" />
  </div>
</template>

<script>
import MyProfile from './MyProfile/MyProfile.vue';
import Swipes from './Swipes/Swipes.vue';
export default {
  name: 'Home',
  components: {
    MyProfile,
    Swipes
  },
  data(){
    return {
      state: 1,
    }
  }
};
</script>

<style scoped lang='scss'>
.home{
  background: #F5F7FA;
  height: 100vh;
  width: 100vw;
  padding: 60px 0 0;
  box-sizing: border-box;
  position: relative;
}
nav{
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
  img{
    height: 40px;
  }
}
</style>