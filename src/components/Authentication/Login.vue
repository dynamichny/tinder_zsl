<template>
  <div class="login">
    <div class="head">
      <button class="close" @click.prevent="$emit('close')">Powrót</button>
      <span>Logowanie</span>
    </div>
    <form @submit.prevent="handleSubmit()">
      <input type="text" placeholder="Email" v-model="login" required />
      <input type="password" placeholder="Password" v-model="password" required />
      <a @click="passReset" class="passReset">Nie pamiętasz hasła?</a>
      <button type="submit" :disabled="loading">
        <span v-if="!loading">Zaloguj</span>
        <img src="@/assets/button-loading.svg" alt="Loading..." v-if="loading" />
      </button>
    </form>
    <PasswordReset v-if="isPasswordReset" @close="isPasswordReset = false" />
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/components/firebaseInit.js";
import store from "@/store/index";
import PasswordReset from "./PasswordReset.vue";

export default {
  name: "Login",
  components: {
    PasswordReset
  },
  data() {
    return {
      login: "",
      password: "",
      loading: false,
      isPasswordReset: false
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
            db.collection("users")
              .doc(this.login)
              .onSnapshot(res => {
                store.commit("setUser", res.data());
              });
          })
          .catch(err => alert(err));
      }
    },
    passReset() {
      this.isPasswordReset = true;
    }
  }
};
</script>

<style scoped lang='scss'>
.register {
  height: 100%;
  box-sizing: border-box;
}
form {
  height: 100%;
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
}
input {
  background: white;
  padding: 15px;
  margin: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  font-family: "Montserrat";
  outline: none;
  transition: all 0.3s;
  font-size: 16px;
  &:focus {
    border: 1px solid black;
    box-shadow: 0px 0px 10px rgb(0, 0, 0);
  }
}

button {
  background: black;
  color: white;
  border: none;
  padding: 15px;
  font-family: "Montserrat";
  font-size: 18px;
  margin: 30px 10px;
  border-radius: 5px;
  height: 50px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: auto;
  box-sizing: border-box;
  padding: 10px;

  button {
    margin: 0;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
}

.passReset {
  margin: 5px 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>