<template>
  <div class="register">
    <vue-headful title="Rejestracja" />
    <form @submit.prevent="handleSubmit()">
      <input type="email" placeholder="Email" v-model="login" required />
      <input type="password" placeholder="Haslo" v-model="password" required />
      <input type="password" placeholder="Podaj haslo ponownie" v-model="repassword" required />
      <input type="text" placeholder="Imie" v-model="firstname" required />
      <div class="selects">
        <select name="klasa" v-model="klasa" required>
          <option :value="null" :diabled="true" selected>klasa</option>
          <option value="0">1 po podstawówie</option>
          <option value="1">1 po gimnazjum</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select name="kierunek" v-model="kierunek" required>
          <option :value="null" :diabled="true" selected>kierunek</option>
          <option value="fototechnik">fototechnik</option>
          <option value="automatyk">automatyk</option>
          <option value="informatyk">informatyk</option>
          <option value="elektronik">elektronik</option>
          <option value="teleinformatyk">teleinformatyk</option>
        </select>
        <select name="plec" v-model="plec" required>
          <option :value="null" :diabled="true" selected>płeć</option>
          <option value="k">Kobieta</option>
          <option value="m">Mężczyzna</option>
          <option value="i">Inne</option>
        </select>
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="!loading">Załóż konto</span>
        <img src="@/assets/button-loading.svg" alt="Loading..." v-if="loading" />
      </button>
      <a @click="$emit('switch')" class="passReset">Logowanie</a>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/components/firebaseInit.js';
import store from '@/store/index';

export default {
  name: 'Register',
  data() {
    return {
      login: '',
      password: '',
      repassword: '',
      firstname: '',
      klasa: null,
      kierunek: null,
      plec: null,
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      if (
        this.login &&
        this.password &&
        this.password == this.repassword &&
        this.firstname &&
        this.klasa &&
        this.kierunek
      ) {
        this.loading = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.login, this.password)
          .then(() => {
            db.collection('users')
              .doc(this.login)
              .set({
                email: this.login,
                firstname: this.firstname,
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
              });
          })
          .catch(err => {
            this.loading = false;
            alert(err);
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.register {
  box-sizing: border-box;
}
form {
  height: 100%;
  max-width: 600px;
  margin: auto auto 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  align-items: center;
}
input,
select {
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
select {
  margin: 0;
  width: 100%;
}

button {
  background: linear-gradient(225deg, #dd4587, #ff8941);
  color: white;
  border: none;
  padding: 10px 50px;
  font-family: 'Montserrat';
  font-size: 18px;
  margin: 20px 10px 30px;
  height: 50px;
  outline: none;
  &:hover {
    background: linear-gradient(45deg, #dd4587, #ff8941);
  }
}
.selects {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  @media (max-width: 550px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 350px) {
    grid-template-columns: 1fr;
  }
}
label {
  font-size: 20px;
}
.passReset {
  margin: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
