<template>
  <div class="myprofile-settings">
    <div>
      <h2>Ustawienia</h2>
      <div class="photos">
        <ProfilePhoto :photoname="photos[0]" :idkey="1" @src="img1 = $event" />
        <ProfilePhoto :photoname="photos[1]" :idkey="2" @src="img2 = $event" />
      </div>
      <div class="textinput">
        <h4>O MNIE</h4>
        <textarea cols="30" rows="10" v-model="about"></textarea>
      </div>
      <div class="textinput">
        <h4>INSTAGRAM</h4>
        <input type="text" v-model="instagram" />
      </div>
      <div class="textinput">
        <h4>SNAPCHAT</h4>
        <input type="text" v-model="snapchat" />
      </div>
      <button @click="saveSettings" :disabled="loading">
        <span v-if="!loading">Zapisz</span>
        <img src="@/assets/button-loading.svg" alt="Loading..." v-if="loading">
      </button>
    </div>
  </div>
</template>

<script>
import ProfilePhoto from "./ProfilePhoto.vue";
import store from "@/store/index";
import db from "@/components/firebaseInit.js";
import firebase from "firebase";

export default {
  name: "MyProfileSettings",
  components: {
    ProfilePhoto
  },
  data() {
    return {
      about: "",
      instagram: "",
      snapchat: "",
      img1: "",
      img2: "",
      randomId: "",
      loading: false,
    };
  },
  computed: {
    photos() {
      return store.state.currentUser.photos;
    },
    username() {
      return store.state.currentUser.email;
    },
    currentUser() {
      return store.state.currentUser;
    }
  },
  methods: {
    saveSettings() {
      this.loading = true;
      db.collection("users")
        .doc(this.username)
        .update({
          instagram: this.instagram,
          snapchat: this.snapchat,
          description: this.about
        })
        .then(async () => {
          if (typeof this.img1 == "object") {
            await this.replacePhoto(this.img1, 0);
          }
          if (typeof this.img2 == "object") {
            await this.replacePhoto(this.img2, 1);
          }
          this.$emit("save");
          this.loading = false;
        })
        .catch(err => {
          alert(err)
          this.loading = false;
          })
    },
    generateRandomId() {
      this.randomId =
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
    },
    async replacePhoto(file, index) {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      this.generateRandomId();
      const fileName = `${this.randomId}.png`;
      const dirRef = storage.ref(`profilePhotos/${fileName}`);
      const task = dirRef.put(file);
      await task.on(
        "state_changed",
        () => {},
        () => {
          alert("Uploading failed.");
        },
        () => {
          let oldPath = this.currentUser.photos[index];
          let userPhotos = this.photos;
          userPhotos[index] = fileName;
          db.collection("users")
            .doc(this.username)
            .update({ photos: userPhotos });
          if (typeof oldPath !== "undefined") {
            storageRef
              .child(`profilePhotos/${oldPath}`)
              .delete()
              .then(() => {
                //alert('Deleted old file!')
              });
          }
        }
      );
    }
  },
  mounted() {
    this.about = this.currentUser.description;
    this.instagram = this.currentUser.instagram;
    this.snapchat = this.currentUser.snapchat;
  }
};
</script>

<style scoped lang='scss'>
.myprofile-settings {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100%;
  background: #f5f7fa;
  box-sizing: border-box;
  z-index: 100;
  padding: 0 0 50px;
  margin: auto;
  &>div{
    max-width: 700px;
    margin: auto;
    overflow: auto;
  }
}

.photos {
  display: flex;
  justify-content: space-around;
}
.textinput {
  input,
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    resize: none;
    width: 100%;
    margin: 0;
    border: 1px solid rgb(187, 187, 187);
    padding: 10px;
    font-size: 16px;
    box-sizing: border-box;
    border-radius: 0;
    box-shadow: none;
    background: white;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
  }
  h4 {
    margin: 20px 0 0;
  }
}
h2,
h4 {
  padding: 10px;
}
button {
  background: linear-gradient(225deg, #dd4587, #ff8941);
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  color: white;
  border: none;
  padding: 20px 40px;
  margin: 30px auto 0;
  border-radius: 5px;
  font-size: 18px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 150px;
}
</style>