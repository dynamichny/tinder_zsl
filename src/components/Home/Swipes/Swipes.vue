<template>
  <div class="swipes">
    <transition-group name="slide">
      <Poster
        v-for="(person, index) in matches "
        :key="person.email"
        :position="index"
        :data="person"
      />
    </transition-group>
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
        let isMatched = alreadyMatched.includes(user.email)
        return (isGender && isClass && !isMatched);
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