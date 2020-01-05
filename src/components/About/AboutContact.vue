<template>
  <div class="contact">
    <div class="text">
      <h4>Kontakt</h4>
      <p>Jeżeli widzisz jakąś potencjalną zmiane, buga, masz pomysł na rozwój aplikacji lub po prostu chcesz nawiązać kontakt to po napisz do mnie wiadomość.</p>
    </div>
    <div class="form">
      <transition name="form" mode="out-in">
        <form @submit.prevent="sendMessage" v-if="!sent">
          <input type="email" placeholder="Twój email" v-model="emailAddress" required />
          <textarea placeholder="w czym moge Ci pomóc?" v-model="emailText" required></textarea>
          <button type="submit">Wyślij</button>
        </form>
        <div class="sent" v-else>
          <div class="circle">
            <img src="@/assets/about/true.svg" />
          </div>
          <p>Wiadomość wysłana!</p>
          <a class="next" @click="writeAnother">Napisz kolejną</a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import db from "@/components/firebaseInit.js";
export default {
  name: "AboutContact",
  data() {
    return {
      emailAddress: "",
      emailText: "",
      sent: false
    };
  },
  methods: {
    sendMessage() {
      db.collection("contact")
        .add({
          address: this.emailAddress,
          content: this.emailText
        })
        .then(() => {
          this.sent = true;
        });
    },
    writeAnother() {
      this.emailAddress = "";
      this.emailText = "";
      this.sent = false;
    }
  }
};
</script>

<style scoped lang='scss'>
.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding: 0 10%;
  margin: 0 0 150px;
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 30px;
  }
}
.text {
  h4 {
    font-size: 52px;
    margin: 0;
  }
  p {
    font-size: 20px;
    width: 70%;
    margin: 20px 30px;
    @media (max-width: 650px) {
      width: 95%;
      margin: 5px 20px;
    }
  }
}
.form {
  position: relative;
}
form {
  padding: 80px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  input,
  textarea {
    width: 70%;
    margin: 0 auto 20px;
    padding: 10px;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 18px;
    outline: none;
    border-radius: 0;
    transition: all 0.2s;
    @media (max-width: 650px) {
      width: 95%;
    }
    &::placeholder {
      color: #414141;
      font-weight: 600;
    }
  }
  input {
    border: none;
    border-bottom: 2px solid #e881ae;
    &:focus {
      border-color: #f88155;
    }
  }
  textarea {
    height: 200px;
    resize: none;
    &:focus {
      border-color: #707070;
    }
  }
  button {
    padding: 10px;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    color: white;
    background: linear-gradient(251deg, #dd4587ad 0%, #ff8941 100%);
    font-size: 24px;
    border: none;
    max-width: 200px;
    min-width: 100px;
    width: 60%;
  }
}
.sent {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 50px auto;
  .circle {
    background: linear-gradient(250deg, rgb(221, 69, 135) 0%, #ff8941 100%);
    width: 65px;
    height: 65px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
    }
  }
  p {
    margin: 15px auto 5px;
  }
  .next {
    font-size: 12px;
    margin: 0;
    background: -webkit-linear-gradient(250deg, #dd4587, #ff8941);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
  }
}

.form-enter-active,
.form-leave-active {
  transition: opacity 0.2s 0.3s;
}
.form-enter,
.form-leave-to {
  opacity: 0;
}
</style>