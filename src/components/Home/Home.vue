<template>
  <div class="home">
    <vue-headful 
      title="Tinder Łączności"
    />
    <nav>
      <div>
        <img
          :src="require(`@/assets/profile${state == 0 ? '_colored' : ''}.svg`)"
          @click="changeState(0)"
        />
        <img
          :src="require(`@/assets/logo${state == 1 ? '_colored' : ''}.svg`)"
          style="width: 70px;"
          @click="changeState(1)"
        />
        <img
          :src="require(`@/assets/chat${state == 2 ? '_colored' : ''}.svg`)"
          style="width: 50px;"
          @click="changeState(2)"
        />
      </div>
    </nav>
    <transition name="slide-from-left">
      <MyProfile v-if="state === 0" />
    </transition>
    <transition name="middle">
      <Swipes v-if="state === 1" />
    </transition>
    <transition name="more">
      <More :data="moreData" v-if="isMore" />
    </transition>
    <transition name="slide-from-right">
      <Conversations v-if="state === 2" />
    </transition>
    <transition name="more">
      <Chat v-if="isChat" />
    </transition>
  </div>
</template>

<script>
import MyProfile from "./MyProfile/MyProfile.vue";
import Swipes from "./Swipes/Swipes.vue";
import db from "@/components/firebaseInit.js";
import store from "@/store/index";
import More from "@/components/Home/Swipes/More.vue";
import Conversations from "@/components/Home/Conversations/Conversations.vue";
import Chat from "@/components/Home/Conversations/Chat.vue";

export default {
  name: "Home",
  components: {
    MyProfile,
    Swipes,
    More,
    Conversations,
    Chat
  },
  data() {
    return {
      state: 1,
      prevous: null
    };
  },
  computed: {
    isMore() {
      return store.state.isMore;
    },
    moreData() {
      return store.state.moreData;
    },
    isChat(){
      return store.state.isChat;
    }
  },
  mounted() {
    db.collection("users")
      .get()
      .then(res => {
        let resultsArray = res.docs.map(x => x.data());
        store.commit("setMatches", resultsArray);
      });

    db.collection("users").onSnapshot(res => {
      const users = res.docs.map(doc => doc.data());
      store.commit("setUsers", users);
    });
    /**db.collection('users').get().then(res => {
      res.docs.map(user => {
        let arr = user.data()
        arr.chats = [];
        db.collection('users').doc(arr.email).update(arr)
      })
    })*/
  },
  methods: {
    changeState(x) {
      this.prevous = this.state;
      this.state = x;
    }
  }
};
</script>

<style scoped lang='scss'>
.home {
  background: #f5f7fa;
  height: 100vh;
  width: 100vw;
  padding: 60px 0 0;
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;
}
nav {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  background: white;
  margin: 0 auto;
  box-sizing: border-box;
  div{
    margin: auto;
    width: 100%;
    max-width: 700px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      height: 40px;
      cursor: pointer;
    }
  }
}
.slide-from-right-enter-active {
  transition: all 0.5s 0.3s;
}

.slide-from-right-leave-active {
  transition: all 0.5s;
}
.slide-from-right-enter,
.slide-from-right-leave-to {
  transform: translateX(100vw);
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
}
.slide-from-left-enter-active {
  transition: all 0.5s 0.3s;
}
.slide-from-left-leave-active {
  transition: all 0.5s;
}
.slide-from-left-enter,
.slide-from-left-leave-to {
  transform: translateX(-100vw);
  position: absolute;
  left: 0;
  right: 0;
}
.more-enter-active,
.more-leave-active {
  transition: all 0.5s;
}
.more-enter,
.more-leave-to {
  transform: translateX(100vw);
}

.middle-enter-active {
  transition: all 0.5s 0.3s;
}
.middle-leave-active {
  transition: all 0.5s;
}
.middle-enter,
.middle-leave-to {
  transform: translateY(-100vh) scale(0.5);
  opacity: 0;
  top: 60px;
}
</style>