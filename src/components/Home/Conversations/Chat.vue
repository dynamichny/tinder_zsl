<template>
  <div class="chat">
    <header>
      <button @click="closeChat">
        <img src="@/assets/back_colored.svg" alt="Powrót" />
      </button>
      <div class="target" @click="showMore">
        <div class="image" :style="profileImage"></div>
        <p class="name">{{targetUser.firstname}}</p>
      </div>
    </header>
    <div class="messages"></div>
    <div class="input">
      <textarea placeholder="Wpisz wiadomość" v-model="inputText" ></textarea>
      <input type="submit" @click.prevent="sendMassage" value="Wyślij" :class="inputText.length > 0 ? 'red' : 'gray'">
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
//import db from "@/components/firebaseInit.js";

export default {
  name: "Chat",
  data() {
    return {
      chat: {},
      inputText: '',
    };
  },
  computed: {
    currentUser() {
      return store.state.currentUser;
    },
    chatTargetEmail() {
      return store.state.chatTarget;
    },
    targetUser() {
      let users = store.state.users;
      return users.find(user => user.email == this.chatTargetEmail);
    },
    profileImage() {
      return this.targetUser.photos.length > 0
        ? {
            background: `url(${
              this.targetUser.photos[0]
            }) no-repeat center center/cover`
          }
        : {
            background: `url(https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png) no-repeat center center/cover`
          };
    }
  },
  methods: {
    showMore() {
      store.commit("setMoreData", this.targetUser);
      store.commit("changeIsMore", true);
    },
    closeChat() {
      store.commit("setChatState", false);
    }
  }
};
</script>

<style scoped lang='scss'>
.chat {
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  max-width: 700px;
  width: 100%;
  margin: auto;
}
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  border-bottom: 1px solid rgb(199, 199, 199);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    background: none;
    border: none;
    outline: none;
    img{
      height: 50%;
    }
  }
  p {
    margin: 0;
    font-size: 14px;
    text-align: center;
    color: rgb(107, 107, 107);
  }
}
.target {
  margin: auto;
  height: 100%;
  margin: 5px;
  cursor: pointer;
}
.image {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin: auto;
}
.input{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 700px;
  width: 95%;
  margin: auto auto 10px;
  display:flex;
  flex-direction:row;
  border:1px solid grey;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 19px;
  background: rgb(243, 243, 243);
  textarea{
    font-size: 16px;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    flex-grow:2;
    background: rgb(243, 243, 243);
    border:none;
    height: 100%;
    &:focus{
      outline: none;
    }
  }
  input[type=submit]{
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 17px;
    padding: 0;
  }
}
.red{
  color: #DD4587;
}
.gray{
  color: rgb(129, 129, 129);
}
</style>