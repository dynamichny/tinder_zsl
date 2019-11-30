<template>
  <div class="login">
    <form @submit.prevent="handleSubmit()">
      <input type="text" placeholder="Email" v-model="login" required>
      <input type="password" placeholder="Password" v-model="password" required>
      <button type="submit">Zaloguj</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/components/firebaseInit.js";
import store from '@/store/index';

export default {
  name: 'Login',
  data(){
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    handleSubmit(){
      if(this.login && this.password){
        firebase.auth().signInWithEmailAndPassword(this.login, this.password)
        .then(() => {
          db.collection('users').doc(this.login).get()
          .then(res => {
             store.commit('setUser', res.data());
          })
          .catch(err => alert(err));
        })
        .catch(err => alert(err));
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.register{
  height: 100%;
  box-sizing: border-box;
}
form{
  height: 100%;
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
}
input{
  background: white;
  padding: 15px;
  margin: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  font-family: 'Montserrat';
  outline: none;
  transition: all .3s;
  font-size: 16px;
  &:focus{
    border: 1px solid black;
    box-shadow: 0px 0px 10px rgb(0, 0, 0);
  }
}

button{
  background: black;
  color: white;
  border: none;
  padding: 15px;
  font-family: 'Montserrat';
  font-size: 18px;
  margin: 10px;
  border-radius: 5px;
  box-sizing: border-box;
}
</style>