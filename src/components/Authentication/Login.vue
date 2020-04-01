<template>
  <div class="login">
    <vue-headful title="Logowanie" />
    <form @submit.prevent="handleSubmit()">
      <input type="text" placeholder="Email" v-model="login" required />
      <input type="password" placeholder="Hasło" v-model="password" required />
      <button type="submit" :disabled="loading">
        <span v-if="!loading">Zaloguj</span>
        <img src="@/assets/button-loading.svg" alt="Loading..." v-if="loading" />
      </button>
      <a @click="$emit('passReset')" class="passReset">Nie pamiętasz hasła?</a>
      <a @click="$emit('switch')" class="passReset">Rejestracja</a>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/components/firebaseInit.js';
import store from '@/store/index';

export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      loading: false,
      isPasswordReset: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.login && this.password) {
        this.loading = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.login, this.password)
          .then(() => {
            this.loading = false;
            db.collection('users')
              .doc(this.login)
              .onSnapshot(res => {
                store.commit('setUser', res.data());
              });
          })
          .catch(err => {
            this.loading = false;
            alert(err);
          });
      }
    },
    passReset() {
      this.isPasswordReset = true;
    },
    switchToRegister() {},
  },
};
</script>

<style scoped lang="scss">
.login {
  box-sizing: border-box;
}
form {
  height: 100%;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
}
input {
  background: transparent;
  padding: 15px;
  margin: 10px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid black;
  font-family: 'Montserrat';
  outline: none;
  transition: all 0.2s;
  font-size: 16px;
  width: 100%;
  -webkit-appearance: none;
  border-radius: 0;
  &:focus {
    border-bottom: 2px solid black;
  }
}

button {
  background: linear-gradient(225deg, #dd4587, #ff8941);
  color: white;
  border: none;
  padding: 10px 50px;
  font-family: 'Montserrat';
  font-size: 18px;
  margin: 15px 10px 30px;
  height: 50px;
  width: 170px;
  outline: none;
  &:hover {
    background: linear-gradient(45deg, #dd4587, #ff8941);
  }
}

.passReset {
  margin: 8px;
  font-size: 16px;
  cursor: pointer;
}
</style>
