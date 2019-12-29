<template>
  <div class="passwordReset">
    <img src="@/assets/close.svg" alt="close" class="close" @click="$emit('close')" />
    <h3>Reset hasła</h3>
    <form @submit.prevent="reset" v-if="!sent">
      <input type="email" v-model="email" placeholder="Podaj adres email" required />
      <button type="submit">Resetuj</button>
    </form>
    <div class="sent" v-if="sent">
      <p>Wysłano! Sprawdz skrzynka pocztową!</p>
      <button @click="$emit('close')">Zamknij</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "PasswordReset",
  data() {
    return {
      email: "",
      sent: false
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
        .catch(err => alert(err));
    }
  }
};
</script>

<style scoped lang='scss'>
.passwordReset {
  background: rgb(0, 0, 0);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 500px;
  max-height: 200px;
  width: 90%;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgb(0, 0, 0);
  padding: 20px;
}
h3 {
  margin: 0 auto 30px;
  color: white;
  font-size: 22px;
}

form {
  display: flex;
  flex-direction: column;
  input {
    padding: 10px;
    margin: 0;
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: "Montserrat";
    font-size: 16px;
    width: 100%;
  }
}
button {
  background: linear-gradient(225deg, #dd4587, #ff8941);
  font-family: "Montserrat";
  color: white;
  border: none;
  padding: 10px 15px;
  box-sizing: border-box;
  margin: 10px 0 0;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  width: 100%;
}
.sent {
  width: 80%;
  margin: 0 auto;
  color: white;
  text-align: center;
  p {
    margin: 5px 0;
  }
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>