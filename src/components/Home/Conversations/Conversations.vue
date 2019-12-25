<template>
  <div class="conversations">
    <h4>Twoje pary</h4>
    <div class="PairIcons">
      <PairIcon v-for="pair in pairs" :key="pair" :email="pair" />
    </div>
    <h4>Wiadomości</h4>
    <div class="converations">
      <transition-group name="convos">
        <ConversationLink v-for="convo in conversations" :data="convo" :key="convo.id" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import db from "@/components/firebaseInit.js";
import PairIcon from "./PairIcon.vue";
import ConversationLink from "./ConversationLink.vue";

export default {
  name: "Conversations",
  components: {
    PairIcon,
    ConversationLink
  },
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return store.state.currentUser;
    },
    users() {
      return store.state.users;
    },
    pairs() {
      let myPairs = this.currentUser.pairs;
      let pairs = myPairs.filter(pair =>
        this.users[
          this.users.findIndex(user => user.email == pair)
        ].pairs.includes(this.currentUser.email)
      );
      return pairs.reverse();
    },
    conversations() {
      let existing = store.state.conversations.filter(
        convo => convo.data.exist
      );
      return existing.sort(
        (a, b) => b.data.lastMsg.when.seconds - a.data.lastMsg.when.seconds
      );
    }
  },
  created() {
    const chatsRef = db.collection("chats");
    const chats = chatsRef.where(
      "members",
      "array-contains",
      this.currentUser.email
    );
    chats.onSnapshot(ref => {
      const chatsData = ref.docs.map(doc => {
        return { data: doc.data(), id: doc.id };
      });
      store.commit("setConversations", chatsData);
    });
  }
};
</script>

<style scoped lang='scss'>
.conversations {
  width: 100%;
  height: 100%;
  margin: auto;
  max-width: 700px;
  box-sizing: border-box;
  overflow-x: hidden;
}
.PairIcons {
  display: flex;
  align-items: center;
  justify-content: left;
  overflow: auto;
  margin: auto 5px;
  background: white;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 10px rgb(231, 231, 231);
}
h4 {
  margin: 10px 0 5px 10px;
}
.convos-move {
  transition: all 0.5s;
}
</style>