<template>
  <div class="swipes">
    <vue-headful 
      title="Tinder Łączności"
    />
    <transition-group name="slide">
      <Poster
        v-for="(person, index) in matches "
        :key="person.email"
        :position="index"
        :data="person"
      />
    </transition-group>
    <div v-if="matches.length == 0" class="noMore">Nie masz więcej pasujących osób do swapowania. Spróbuj później.</div>
  </div>
</template>

<script>
import Poster from "./Poster.vue";
import store from "@/store/index";

export default {
  name: "Swipes",
  components: {
    Poster
  },
  computed: {
    matches() {
      let currentUser = store.state.currentUser;
      let preferedGender = currentUser.preferences.genders;
      let preferedClasses = currentUser.preferences.classes;
      let alreadyMatched = currentUser.pairs;
      let users = [...store.state.matches];
      users.splice(users.findIndex(user => user.email == currentUser.email), 1); //delete current user from array
      users = users.filter(user => {
        let isGender = preferedGender.includes(user.plec);
        let isClass = preferedClasses.includes(user.klasa);
        let isMatched = alreadyMatched.includes(user.email);
        return isGender && isClass && !isMatched;
      });
      return users;
    }
  }
};
</script>

<style scoped lang='scss'>
.swipes {
  padding: 10px;
  width: 100%;
  height: calc(100% - 60px);
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  margin: auto;
}
.noMore{
  text-align: center;
  margin: auto;
  padding: 30px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  font-size: 20px;
  vertical-align: middle;
  max-width: 700px;
  background: -webkit-linear-gradient(135deg, #DD4587, #FF8941);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.slide-enter-active {
  transform-origin: top;
  transition: transform 1s;
}
.slide-enter,
.slide-leave-to {
  transform-origin: top;
  transform: translateY(-10px);
}
</style>