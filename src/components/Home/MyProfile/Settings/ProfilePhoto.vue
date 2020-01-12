<template>
  <div class="photo-container">
    <div class="cont">
      <img :src="newPhoto || imgSrc" class="photo" :ref="imgId" />
      <input type="file" accept="image/*" :id="id" :ref="id" @change="inputChange" />
      <label :for="id" class="input-label">
        <img src="@/assets/add.svg" alt="Add" :style="imgSrc ? 'visibility: hidden;' : ''" />
      </label>
    </div>
    <div class="delete" @click="$emit('deletePhoto')" v-if="photoname">X</div>
  </div>
</template>

<script>
export default {
  name: "ProfilePhoto",
  props: ["photoname", "idkey"],
  data() {
    return {
      imageUploaded: false,
      newPhoto: null,
    };
  },
  computed: {
    id() {
      return `input${this.idkey}`;
    },
    imgId() {
      return `image${this.idkey}`;
    },
    imgSrc(){
      if(this.photoname){
        return `https://firebasestorage.googleapis.com/v0/b/tinder-zsl.appspot.com/o/profilePhotos%2Fthumb@256_${this.photoname}?alt=media`;
      }
      return false;
    }
  },
  methods: {
    inputChange() {
      let input = this.$refs[this.id];
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.imageUploaded = true;
          this.newPhoto = e.target.result;
          this.$emit("src", this.imgSrc == undefined ? "" : input.files[0]);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  },
  mounted() {
    this.$emit("src", this.imgSrc == undefined ? "" : this.imgSrc);
    
  }
};
</script>

<style scoped lang='scss'>
.photo-container {
  width: 130px;
  height: 200px;
  background: #d8d8d8;
  border: 2px dashed #bfbfbf;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  box-sizing: border-box;
}
.cont{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.photo {
  max-height: 100%;
  object-fit: cover;
  z-index: 2;
}
.input-label {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  display: block;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    z-index: 1;
    width: 50%;
  }
}
input {
  display: none;
}
.delete{
  background: rgb(255, 70, 70);
  color: white;
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 10000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  cursor: pointer;
}
</style>