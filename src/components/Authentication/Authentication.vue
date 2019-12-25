<template>
  <div class="authentication">
    <Register v-if="isRegister" @close="isRegister = false" />
    <Login v-if="isLogin" @close="isLogin = false" />
    <div v-if="!isRegister && !isLogin">
      <transition name="slide">
        <div class="authentication__title">
          <img src="@/assets/logo_white.png" />
          <h1>tinder łączności</h1>
        </div>
      </transition>
      <div class="authentication__buttons">
        <button @click="isLogin = true">Zaloguj</button>
        <button @click="isRegister = true">Zarejestruj</button>
      </div>
    </div>
  </div>
</template>

<script>
import Register from "./Register.vue";
import Login from "./Login.vue";

export default {
  name: "Authentication",
  components: {
    Register,
    Login
  },
  data() {
    return {
      isRegister: false,
      isLogin: false
    };
  }
};
</script>

<style scoped lang='scss'>
.authentication {
  background: linear-gradient(#dd4587, #ff8941);
  margin: 0;
  min-height: 100%;
  box-sizing: border-box;
  padding: 20px;

  &__title {
    margin: auto;
    text-align: center;
    color: white;
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
      font-family: "Montserrat";
      font-weight: bold;
      width: 90%;
      max-width: 500px;
      font-size: 20px;
      background: white;
      border: none;
      padding: 20px;
      box-sizing: border-box;
      margin: 10px 0;
    }
  }
}

.slide-enter-active .slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  transform: translateY(50px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>