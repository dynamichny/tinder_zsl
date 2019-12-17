<template>
  <div class="contact">
    <div :style="bg" class="image" @click="openChat"></div>
  </div>
</template>

<script>
import store from '@/store/index';

export default {
  name: 'PairIcon',
  props: [
    'email'
    ],
  computed: {
    users(){
      return store.state.users;
    },
    contactUser(){
      return this.users.find(user => user.email == this.email)
    },
    bg(){
      return {
        background: `url(${this.contactUser.photos.length > 0 ? this.contactUser.photos[0] : 'https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}) no-repeat center center/cover`,
      }
    }
  },
  methods: {
    openChat(){
      store.commit('setChatTarget', this.email);
      store.commit('setChatState', true);
    }
  }
};
</script>

<style scoped lang='scss'>
.contact{
  padding: 5px;
}
.image{
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 50%;

}
</style>