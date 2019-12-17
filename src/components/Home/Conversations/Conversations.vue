<template>
  <div class="conversations">
    <h4>Twoje pary</h4>
    <div class="PairIcons">
      <PairIcon v-for="pair in pairs" :key="pair" :email="pair" />
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import PairIcon from "./PairIcon.vue";

export default {
  name: "Conversations",
  components: {
    PairIcon
  },
  data() {
    return {};
  },
  computed: {
    convos() {
      return store.state.convos;
    },
    users() {
      return store.state.users;
    },
    pairs() {
      let currentUser = store.state.currentUser;
      let myPairs = currentUser.pairs;
      let pairs = myPairs.filter(pair =>
        this.users[
          this.users.findIndex(user => user.email == pair)
        ].pairs.includes(currentUser.email)
      );
      return pairs.reverse();
    }
  },
  created() {}
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
}
.PairIcons {
  display: flex;
  align-items: center;
  justify-content: left;
  overflow-x: auto;
  margin: auto;
}
h4{
  margin: 10px 0 0;
}
</style>