<template>
  <div class="myprofile">
    <div class="overview">
      <img :src="photo">
      <h2>{{name}}</h2>
    </div>
    <div class="buttons">
      <button @click="settings = true">Ustawienia profilu</button>
      <button @click="preferences = true">Zmień preferencje</button>
    </div>
    <Preferences v-if="preferences" @save="preferences = false"/>
    <MyProfileSettings v-if="settings" @save="settings = false"/>
  </div>
</template>

<script>
import store from '@/store/index';
import Preferences from '@/components/Preferences/Preferences.vue';
import MyProfileSettings from './Settings/MyProfileSettings.vue';

export default {
  name: 'MyProfile',
  components: {
    Preferences,
    MyProfileSettings,
  },
  data(){
    return {
      preferences: false,
      settings: false,
    }
  },
  computed: {
    name(){
      return store.state.currentUser.firstname;
    },
    photo(){
      return store.state.currentUser.photos.length > 0 ? store.state.currentUser.photos[0] : 'https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
    }
  },
};
</script>

<style scoped lang='scss'>
.overview{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto 0;
  max-width: 700px;

  img{
    width: 50%;
    border-radius: 50%;
  }
}

.buttons{
  display: flex;
  flex-direction: column;
  button{
    margin: 10px auto;
    padding: 20px;
    background: black;
    color: white;
    border: none;
    font-family: 'Montserrat';
    font-size: 18px;
    border-radius: 5px;
    max-width: 650px;
    width: 80%;
  }
  
}
</style>