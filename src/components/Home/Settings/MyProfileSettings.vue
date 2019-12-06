<template>
  <div class="myprofile-settings">
    <h2>Ustawienia</h2>
    <div class="photos">
      <ProfilePhoto :url="photos[0]" :idkey="1" @src="img1src = $event"/>
      <ProfilePhoto :url="photos[1]" :idkey="2" @src="img2src = $event"/>
    </div>
    <div class="textinput">
      <h4>O MNIE</h4>
      <textarea cols="30" rows="10" v-model="about"></textarea>
    </div>
    <div class="textinput">
      <h4>INSTAGRAM</h4>
      <input type="text" v-model="instagram">
    </div>
    <div class="textinput">
      <h4>SNAPCHAT</h4>
      <input type="text" v-model="snapchat">
    </div>
    <button @click="saveSettings">Zapisz</button>
  </div>
</template>

<script>
import ProfilePhoto from './ProfilePhoto.vue'
import store from '@/store/index';
import db from "@/components/firebaseInit.js";

export default {
  name: 'MyProfileSettings',
  components: {
    ProfilePhoto,
  },
  data(){
    return {
      about: '',
      instagram: '',
      snapchat: '',
      img1src: '',
      img2src: ''
    }
  },
  computed: {
    photos(){
      return store.state.currentUser.photos;
    },
    username(){
      return store.state.currentUser.email;
    },
    currenUser(){
      return store.state.currentUser;
    }
  },
  methods: {
    saveSettings() {
      db.collection('users').doc(this.username).update({
        instagram: this.instagram,
        snapchat: this.snapchat,
        description: this.about,
        photos: [
          this.img1src,
          this.img2src,
        ]
      })
      .then(()=> {
        this.$emit('save');
      })
    }
  },
  mounted(){
    this.about = this.currenUser.description;
    this.instagram = this.currenUser.instagram;
    this.snapchat = this.currenUser.snapchat;
  }
};
</script>

<style scoped lang='scss'>
.myprofile-settings{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100%;
  background: #F5F7FA;
  box-sizing: border-box;
  z-index: 100;
  overflow: auto;
  padding: 0 0 50px;
  max-width: 700px;
  margin: auto;
}

.photos{
  display: flex;
  justify-content: space-around;
}
.textinput{
  input, textarea{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    width: 100%;
    margin: 0;
    border: 1px solid rgb(187, 187, 187);
    padding: 10px;
    font-size: 16px;
    box-sizing: border-box;
    border-radius: 0;
    box-shadow: none;
    background: white;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;

  }
  h4{
    margin: 20px 0 0;
  }
}
h2, h4{
  padding: 10px;
}
button {
  background: linear-gradient(225deg, #dd4587, #ff8941);
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: white;
  border: none;
  padding: 20px 40px;
  margin: 30px auto 0;
  border-radius: 5px;
  font-size: 18px;
  outline: none;
  display: block;
}
</style>