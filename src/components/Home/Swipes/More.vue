<template>
  <div class="more-wrapper">
    <div class="photos" :style="bg">
      <div
        class="left"
        @click="photoDisplayed = 0"
        :class="photoDisplayed == 0 ? 'active' : ''"
        v-if="data.photos.length>1 "
      ></div>
      <div
        class="right"
        @click="photoDisplayed = 1"
        :class="photoDisplayed == 1 ? 'active' : ''"
        v-if="data.photos.length>1"
      ></div>
      <div class="back" @click="back">Powrót</div>

    </div>
    <div class="text">
      <span class="name">{{data.firstname}}</span>
      <span class="class-year"> klasa {{data.klasa == 0 ? '1 po podstawówce' : data.klasa == 1 ? '1 po gimnazjum' : data.klasa}} {{data.kierunek}}</span>
      <hr>
      <p v-if="data.description">{{data.description}}</p>
      <div class="instagram-box" v-if="data.instagram">
        <h4>INSTAGRAM</h4>
        <a :href="instagramLink" target="_blank">@{{data.instagram}}</a>
      </div>
      <div class="snapchat-box" v-if="data.snapchat">
        <h4>SNAPCHAT</h4>
        <a target="_blank">@{{data.snapchat}}</a>
      </div>
      <div class="nothing-there" v-if="nothingThere">
        UPS! Ten użytkownik nie udostępnił żadnych informacji na swój temat.
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
export default {
  name: 'More',
  data(){
    return {
      photoDisplayed: 0,
    }
  },
  computed: {
    data(){
      return store.state.moreData;
    },
    bg(){
      return this.data.photos.length > 0 ? {
        background: `url(${this.data.photos[this.photoDisplayed]}) no-repeat center center/cover`,
      } : {
        background: `url(https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png) no-repeat center center/cover`
      }
    },
    instagramLink(){
      return `https://www.instagram.com/${this.data.instagram}/`
    },
    nothingThere(){
      return !(!!this.data.description || !!this.data.instagram || !!this.data.snapchat);
    }
  },
  methods: {
    back(){
      store.commit('changeIsMore', false)
    }
  }
};
</script>

<style scoped lang='scss'>
.more-wrapper{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  z-index: 1000;
  overflow-y: scroll;
  max-width: 700px;
  margin: auto;
  
}
.photos{
  width: 100%;
  height: 60vh;
  display: flex;
  z-index: 20;
  position: relative;
}
.left,
.right {
  width: 50%;
  height: 100%;
  display: block;
  cursor: pointer;
}
.active {
  border-top: 4px solid white;
}

.text{
  padding: 30px 15px;
  background: white;
  z-index: 21;
}
.name{
  font-weight: bold;
  font-size: 30px;
  word-wrap: break-word;
}
.class-year{
  font-size: 15px;
}
hr{
  background: #ffffff;
}

h4{
  margin: 30px 0 10px;
}
a{
  text-decoration: none;
  color: rgb(255, 47, 99);
  cursor: pointer;
}
.back{
  position: absolute;
  bottom: -20px;
  left: 10px;
  padding: 15px;
  background: linear-gradient(45deg, #DD4587, #FF8941);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}
.nothing-there{
  text-align: center;
  margin: 20px 0;
  word-wrap: break-word;
  overflow-wrap: inherit;
  background: -webkit-linear-gradient(45deg, #DD4587, #FF8941);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>