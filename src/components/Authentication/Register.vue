<template>
  <div class="register">
    <form @submit.prevent="handleSubmit()">
      <input type="email" placeholder="Email" v-model="login" required>
      <input type="password" placeholder="Haslo" v-model="password" required>
      <input type="password" placeholder="Podaj haslo ponownie" v-model="repassword" required>
      <input type="text" placeholder="Imie" v-model="firstname" required>
      <input type="text" placeholder="Nazwisko" v-model="lastname" required>
      <div class="klasa select">
        <label for="klasa">Klasa</label>
        <select name="klasa" v-model="klasa" required>
          <option value="0">1 po podstawówie</option>
          <option value="1">1 po gimnazjum</option> 
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div class="kierunek select">
        <label for="kierunek">Kierunek</label>
        <select name="kierunek" v-model="kierunek" required>
          <option value="fototechnik">fototechnik</option>
          <option value="automatyk">automatyk</option>
          <option value="informatyk">informatyk</option>
          <option value="elektronik">elektronik</option>
          <option value="teleinformatyk">teleinformatyk</option>
        </select>
      </div>
      <div class="plec select">
        <label for="plec">Płeć</label>
        <select name="plec" v-model="plec" required>
          <option value="k">Kobieta</option>
          <option value="m">Mężczyzna</option>
          <option value="i">Inne</option>
        </select>
      </div>
      <button type="submit">Załóż konto</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/components/firebaseInit.js";
import store from '@/store/index';

export default {
  name: 'Register',
  data(){
    return {
      login: '',
      password: '',
      repassword: '',
      firstname: '',
      lastname:  '',
      klasa: null,
      kierunek: null,
      plec: null,

    }
  },
  methods: {
    handleSubmit(){
      if(this.login && this.password && this.password == this.repassword && this.firstname && this.lastname && this.klasa && this.kierunek){
        firebase.auth().createUserWithEmailAndPassword( this.login, this.password )
        .then(() => {
          db.collection('users').doc(this.login).set({
            email: this.login,
            firstname: this.firstname,
            lastname: this.lastname,
            klasa: this.klasa,
            kierunek: this.kierunek,
            pairs: [],
            plec: this.plec,
            preferences: {
              isSet: false,
              genders: [],
              classes: [],
            },
            photos: [],
            description: '',
            instagram: '',
            snapchat: '',
          });
          firebase.auth().signInWithEmailAndPassword( this.login, this.password )
          .then(() => {
            db.collection('users').doc(this.login).onSnapshot(res => {
              store.commit('setUser', res.data());
            });
          })
        })
        .catch(err => alert(err))
      }
    }
  },
};
</script>

<style scoped lang='scss'>
.register{
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
input, select{
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
.select{
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  box-sizing: border-box;
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