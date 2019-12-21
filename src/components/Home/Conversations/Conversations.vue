<template>
  <div class="conversations">
    <h4>Twoje pary</h4>
    <div class="PairIcons">
      <PairIcon v-for="pair in pairs" :key="pair" :email="pair" />
    </div>
    <div class="converations">

    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import PairIcon from "./PairIcon.vue";
import db from "@/components/firebaseInit.js";

export default {
  name: "Conversations",
  components: {
    PairIcon
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
      return store.state.conversations;
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
      const chatsData = ref.docs.map(doc => { return {data: doc.data(), id: doc.id}});
      store.commit("setConversations", chatsData);
    });
  }
};
</script>

<style scoped lang='scss'>
.conversations {
  width: 100%;
  height: 100%;
  background: white;
  margin: auto;
  max-width: 700px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.PairIcons {
  display: flex;
  align-items: center;
  justify-content: left;
  overflow-x: auto;
  margin: auto;
}
h4 {
  margin: 10px 0 0;
}
</style>