<template>
  <div class="home">
    <nav>
      <img :src="require(`@/assets/profile${state == 0 ? '_colored' : ''}.svg`)" @click="state = 0">
      <img :src="require(`@/assets/logo${state == 1 ? '_colored' : ''}.svg`)" style="width: 70px;" @click="state = 1">
      <img :src="require(`@/assets/chat${state == 2 ? '_colored' : ''}.svg`)" style="width: 50px;" @click="state = 2">
    </nav>
    
  </div>
</template>

<script>
export default {
  name: 'Home',
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
  height: 100%;
}
nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: white;
  max-width: 700px;
  margin: auto;
  img{
    height: 50px;
  }
}
</style>