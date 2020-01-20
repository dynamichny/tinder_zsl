<template>
  <div class="chat">
    <header>
      <button @click="closeChat">
        <img src="@/assets/back_colored.svg" alt="Powrót" />
      </button>
      <div class="target" @click="showMore">
        <div class="image" :style="profileImage"></div>
        <p class="name">{{chatTargetData.firstname}}</p>
      </div>
    </header>
    <div class="messages" ref="messages">
      <Message v-for="(message, index) in messages" :key="index" :data="message" :currentUserEmail="currentUser.email" :prevous="messages[index - 1]" @mount="chatChange = $event" />
    </div>
    <div class="input">
      <textarea placeholder="Wpisz wiadomość" v-model="inputText"></textarea>
      <input
        type="submit"
        @click="sendMassage"
        value="Wyślij"
        :class="inputText.length > 0 ? 'red' : 'gray'"
      />
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import db from "@/components/firebaseInit.js";
import Message from './Message.vue';

export default {
  name: "Chat",
  components: {
    Message
  },
  data() {
    return {
      inputText: "",
      randomId: "",
      messages: [],
      chatChange: null,
    };
  },
  computed: {
    currentUser() {
      return store.state.currentUser;
    },
    chatTargetEmail() {
      return store.state.chatTarget;
    },
    chatTargetData() {
      let users = store.state.users;
      return users.find(user => user.email == this.chatTargetEmail);
    },
    profileImage() {
      return this.chatTargetData.photos.length > 0
        ? {
            background: `url(
              https://firebasestorage.googleapis.com/v0/b/tinder-zsl.appspot.com/o/profilePhotos%2Fthumb@64_${this.chatTargetData.photos[0]}?alt=media
            ) no-repeat center center/cover`
          }
        : {
            background: `url(https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png) no-repeat center center/cover`
          };
    },
    chat() {
      let chats = store.state.conversations;
      let chatData = chats.find(chat =>
        chat.data.members.includes(this.chatTargetEmail)
      );
      if (chatData == undefined) {
        this.createConversation();
      }
      return chatData;
    }
  },
  methods: {
    showMore() {
      store.commit("setMoreData", this.chatTargetData);
      store.commit("changeIsMore", true);
    },
    closeChat() {
      store.commit("setChatState", false);
    },
    generateRandomId() {
      this.randomId =
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
    },
    createConversation() {
      this.generateRandomId();
      db.collection("chats")
        .doc(this.randomId)
        .set({
          members: [this.currentUser.email, this.chatTargetEmail],
          lastMsg: {},
          exist: false,
        });
    },
    sendMassage() {
      if (this.inputText.length == 0) return;
      let msg = {
          author: this.currentUser.email,
          content: this.inputText,
          when: new Date()
        };
      db.collection("chats")
        .doc(this.chat.id)
        .collection("messages")
        .add(msg)
        .then(() => {
          this.inputText = "";
        })
        .catch(err => alert(err));
      db.collection('chats').doc(this.chat.id).update({
        exist: true,
        lastMsg: msg
      })
    },
    getMessages() {
      db.collection("chats")
        .doc(this.chat.id)
        .collection("messages")
        .onSnapshot(res => {
          if (res.empty != true) {
            let messages = res.docs.map(doc => doc.data());
            this.messages = messages.sort(
              (a, b) => a.when.seconds - b.when.seconds
            );
          }
        });
    },
    goToBottom(){
      const el = this.$refs.messages;
      el.scrollTop = el.scrollHeight;
    }
  },
  mounted() {
    if (this.chat) this.getMessages();
  },
  watch: {
    chat() {
      this.getMessages();
    },
    chatChange(){
      this.goToBottom()
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
  width: 100%;
  height: 100%;
  margin: auto;
  box-sizing: border-box;
  @media (min-width: 700px) {
    padding: 0 calc((100vw - 700px)/2) ;
  }
}
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 700px;
  margin: auto;
  width: 100%;
  height: auto;
  border-bottom: 1px solid rgb(199, 199, 199);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1010;
  button {
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    background: none;
    border: none;
    outline: none;
    img {
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
.input {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 700px;
  width: 95%;
  margin: auto auto 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid grey;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 19px;
  background: rgb(243, 243, 243);
  textarea {
    font-size: 16px;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    flex-grow: 2;
    background: rgb(243, 243, 243);
    border: none;
    height: 100%;
    resize: none;
    &:focus {
      outline: none;
    }
  }
  input[type="submit"] {
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 17px;
    padding: 0;
  }
}
.red {
  color: #dd4587;
}
.gray {
  color: rgb(129, 129, 129);
}
.messages {
  height: calc(100% - 145px);
  margin: 75px 0 50px;
  overflow-y: scroll;
  z-index: 1000;
}
pre{
  margin: 0;
}
</style>