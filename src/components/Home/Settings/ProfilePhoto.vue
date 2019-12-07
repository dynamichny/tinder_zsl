<template>
  <div class="photo-container">
    <img :src="imgSrc" class="photo" :ref="imgId" />
    <input type="file" accept="image/*" :id="id" :ref="id" @change="inputChange" />
    <label :for="id" class="input-label">
      <img src="@/assets/add.svg" alt="Add" :style="imgSrc ? 'visibility: hidden;' : ''" />
    </label>
  </div>
</template>

<script>
export default {
  name: "ProfilePhoto",
  props: ["url", "idkey"],
  data() {
    return {
      imageUploaded: false,
      imgSrc: this.url
    };
  },
  computed: {
    id() {
      return `input${this.idkey}`;
    },
    imgId() {
      return `image${this.idkey}`;
    }
  },
  methods: {
    inputChange() {
      let input = this.$refs[this.id];
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.imageUploaded = true;
          this.imgSrc = e.target.result;
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
  overflow: hidden;
  box-sizing: border-box;
}
.photo {
  max-height: 100%;
  object-fit: cover;
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
    width: 50%;
  }
}
input {
  display: none;
}
</style>