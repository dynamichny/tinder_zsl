<template>
  <div class="passwordReset">
    <vue-headful title="Resetuj hasło" />
    <form @submit.prevent="reset" v-if="!sent">
      <input type="email" v-model="email" placeholder="Podaj adres email" required />
      <button type="submit">Resetuj</button>
    </form>
    <div class="sent" v-if="sent">
      <p>Wysłano wiadomość potwierdzającą! Sprawdz skrzynkę pocztową!</p>
    </div>
    <a @click="$emit('login')" class="passReset">Logowanie</a>
    <a @click="$emit('register')" class="passReset">Rejestracja</a>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'PasswordReset',
  data() {
    return {
      email: '',
      sent: false,
    };
  },
  methods: {
    reset() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.sent = true;
        })
        .catch(() => {
          this.sent = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.passwordReset {
  max-width: 500px;
  width: 90%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    width: 100%;
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
  .sent {
    width: 80%;
    margin: 0 auto 40px;
    font-weight: 600;
    color: rgb(0, 0, 0);
    text-align: center;
    p {
      margin: 5px 0;
    }
  }
}
.passReset {
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
