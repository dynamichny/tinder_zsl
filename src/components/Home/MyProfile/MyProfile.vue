<template>
  <div class="myprofile">
    <vue-headful title="Tinder Łączności" />
    <div class="overview">
      <div class="photo-container">
        <img src="@/assets/loading.svg" class="loading" />
        <img class="overview-photo" :src="photo" />
      </div>
      <h2>{{ name }}</h2>
    </div>
    <div class="buttons">
      <a @click="settings = true">Ustawienia profilu</a>
      <a @click="preferences = true">Zmień preferencje</a>
      <a @click="logout" class="logout">Wyloguj</a>
    </div>
    <Preferences v-if="preferences" @save="preferences = false" />
    <MyProfileSettings v-if="settings" @save="settings = false" />
  </div>
</template>

<script>
import store from '@/store/index';
import Preferences from '@/components/Preferences/Preferences.vue';
import MyProfileSettings from './Settings/MyProfileSettings.vue';
import firebase from 'firebase';

export default {
  name: 'MyProfile',
  components: {
    Preferences,
    MyProfileSettings,
  },
  data() {
    return {
      preferences: false,
      settings: false,
    };
  },
  computed: {
    name() {
      return store.state.currentUser.firstname;
    },
    photo() {
      let photoName = store.state.currentUser.photos[0];
      return store.state.currentUser.photos.length > 0
        ? `https://firebasestorage.googleapis.com/v0/b/tinder-zsl.appspot.com/o/profilePhotos%2Fthumb@256_${photoName}?alt=media`
        : 'https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
    },
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            store.commit('logout');
          },
          error => {
            alert(error);
          },
        );
    },
  },
};
</script>

<style scoped lang="scss">
.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto 0;
  max-width: 700px;
  h2{
    font-size: 26px;
  }
}
.photo-container {
  width: 50vw;
  height: 50vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  image-orientation: from-image;
  position: relative;
  max-width: 256px;
  max-height: 256px;
  border: 1px solid black;
}
.overview-photo {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  image-orientation: from-image;
  z-index: 10;
}
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
a {
  margin: 10px auto;
  color: black;
  padding: 5px 10px;
  border: none;
  font-family: 'Montserrat';
  font-size: 16px;
  border-radius: 5px;
  max-width: 650px;
  position: relative;
  font-weight: 600;
  line-height: 20px;
  z-index: 10;
  cursor: pointer;
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 7px;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(225deg, #dd4587, #ff8941);
    z-index: 0;
  }
}
.logout {
  margin: 30px auto;
  background: linear-gradient(225deg, #dd4587, #ff8a41be);
  border-radius: 0;
  color: white;
  padding: 10px 30px;
  transition: all .2s;
  &::after{
    display: none ;
  }
  &:hover{
  background: rgb(241, 61, 61);

  }
}
</style>
