<template>
  <div class="conversationLink" @click="openChat">
    <div :style="bg" class="image"></div>
    <div class="text">
      <b>{{targetUser.firstname}}</b>
      <p><span v-if="amIAuthor">Ja: </span>{{data.data.lastMsg.content}}</p>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  name: "ConversationLink",
  data() {
    return {
      lastMsg: null
    };
  },
  props: {
    data: Object
  },
  computed: {
    targetUser() {
      return store.state.users.find(user => {
        let targetEmail =
          this.data.data.members[0] == this.currentUser.email
            ? this.data.data.members[1]
            : this.data.data.members[0];
        return user.email == targetEmail;
      });
    },
    currentUser() {
      return store.state.currentUser;
    },
    bg() {
      return {
        background: `url(${
          this.targetUser.photos.length > 0
            ? this.targetUser.photos[0]
            : "https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
        }) no-repeat center center/cover`
      };
    },
    amIAuthor(){
      return this.data.data.lastMsg.author == this.currentUser.email;
    }
  },
  methods: {
    openChat(){
      store.commit('setChatTarget', this.targetUser.email);
      store.commit('setChatState', true);
    }
  }
};
</script>

<style scoped lang='scss'>
.conversationLink {
  margin: 10px 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: white;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 10px rgb(238, 238, 238);
}
.image {
  margin: 0 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: calc(100% - 120px);

  p{
    margin: 5px 0;
    overflow: hidden;
    height: 20px;
    max-width: 100%;
  }
}
</style>