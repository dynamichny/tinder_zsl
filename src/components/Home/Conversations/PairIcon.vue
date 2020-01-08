<template>
  <div class="contact">
    <div :style="bg" class="image" @click="openChat"></div>
    <p>{{contactUser.firstname}}</p>
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
        background: `url(${this.contactUser.photos.length > 0 ? `https://firebasestorage.googleapis.com/v0/b/tinder-zsl.appspot.com/o/profilePhotos%2Fthumb@64_${this.contactUser.photos[0]}?alt=media` : 'https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}) no-repeat center center/cover`,
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
  padding: 5px 8px;
}
.image{
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 50%;

}
p{
  text-align: center;
  margin: 10px 0 0;
  font-weight: 600;
  font-size: 14px;
}
</style>