<template>
  <div class="authentication">
    <div class="authentication__title" @click="$router.push({ path: '/about' })">
      <img src="@/assets/logo_colored.svg" />
      <h1>tinder łączności</h1>
    </div>
    <Login v-if="isLogin" @switch="isLogin = false; isRegister = true" @passReset="passReset = true; isLogin = false" />
    <Register v-if="isRegister" @switch="isLogin = true; isRegister = false" />
    <PasswordReset v-if="passReset" @login="isLogin = true; passReset = false" @register="isRegister = true; passReset = false"/>
  </div>
</template>

<script>
import Register from './Register.vue';
import Login from './Login.vue';
import PasswordReset from "./PasswordReset.vue";

export default {
  name: 'Authentication',
  components: {
    Register,
    Login,
    PasswordReset
  },
  data() {
    return {
      isRegister: false,
      isLogin: true,
      passReset: false,
    };
  },
};
</script>

<style scoped lang="scss">
.authentication {
  background: white;
  margin: 0;
  min-height: 100%;
  box-sizing: border-box;
  padding: 20px;

  &__title {
    margin: auto auto 55px;
    text-align: center;
    background: -webkit-linear-gradient(#dd4587, #ff8941);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    img {
      width: 200px;
    }
  }
  &__buttons {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    button {
      font-family: 'Montserrat';
      font-weight: bold;
      width: 90%;
      max-width: 300px;
      font-size: 22px;
      background: linear-gradient(#dd4587, #ff8941);
      color: white;
      border: none;
      padding: 20px;
      box-sizing: border-box;
      margin: 10px 0;
    }
  }
}

.apear-enter-active,
.apear-leave-active {
  transition: opacity 0.2s;
}
.apear-enter, .apear-leave-to /* .apear-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
