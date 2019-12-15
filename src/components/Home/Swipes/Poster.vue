<template>
  <div
    ref="poster"
    @mousedown="handleMouseDown"
    @touchstart="handleMouseDown"
    @mouseup="handleMouseUp"
    @touchend="handleMouseUp"
    @mousemove="handleMove"
    @touchmove="handleMove"
    class="poster-wrapper"
    :class="[position == 0 ? '' : position == 1 ? 'one-behind' : position == 2 ? 'two-behind' : 'farther', isHolded ? '' : 'transitionIfNotHolded']"
    :style="posterBg"
  >
    <div class="tekst">
      <h1>{{data.firstname}}</h1>
      <span>klasa {{data.klasa == 0 ? '1 po podstawówce' : data.klasa == 1 ? '1 po gimnazjum' : data.klasa}}, {{data.kierunek}}</span>
    </div>
    <div class="color" ref="color">
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
    </div>
    <div class="more" @click="showMore">i</div>
  </div>
</template>

<script>
import store from "@/store/index";
import db from "@/components/firebaseInit.js";

export default {
  name: "Poster",
  props: {
    position: Number,
    data: Object
  },
  data() {
    return {
      isHolded: false,
      holdX: null,
      xDifference: 0,
      photoDisplayed: 0
    };
  },
  computed: {
    matches() {
      return store.state.matches;
    },
    posterBg() {
      return this.data.photos.length > 0 ? {
        background: `url(${
          this.data.photos[this.photoDisplayed]
        }) no-repeat center center/cover`
      } : {
        background: `url(https://komuna.warszawa.pl/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png) no-repeat center center/cover`
      }
    }
  },
  methods: {
    handleMouseDown(e) {
      this.isHolded = true;
      this.$refs["poster"].style.transition = "none !important";
      if (this.position == 0) {
        if (e.type == "touchstart") {
          this.holdX = Math.round(e.targetTouches[0].pageX);
        } else {
          this.holdX = Math.round(e.pageX);
        }
      }
      this.$refs["poster"].style.transition = "";
    },
    handleMouseUp() {
      this.isHolded = false;
      this.$refs["poster"].style.transition = "all .3s";
      if (this.xDifference > 130) {
        this.addToPairs();
      } else if (this.xDifference < -130) {
        this.removeFromMatches();
      }
    },
    handleMove(e) {
      if (this.isHolded && this.position == 0) {
        //e.targetTouches[0].pageX - this.holdX = różnica od miejsca naciścnięcia do miejsca przeniesienia
        let moveX;
        if (e.type == "mousemove") {
          moveX = e.pageX - this.holdX;
        } else {
          moveX = e.targetTouches[0].pageX - this.holdX;
        }
        const poster = this.$refs["poster"];
        const color = this.$refs["color"];
        poster.style.transform = `translateX(${moveX * 0.85}px) rotate(${moveX *
          0.05}deg)`;
        if (moveX < 0) {
          color.style.background = `hsla(0, 100%, 50%, ${-moveX * 0.002})`;
        } else {
          color.style.background = `hsla(126, 100%, 50%, ${moveX * 0.002})`;
        }
        this.xDifference = Math.round(moveX);
      }
    },
    removeFromMatches() {
      this.$refs["poster"].style.display = "none";
      let matchesArray = this.matches;
      matchesArray.splice(
        matchesArray.findIndex(x => x.email == this.data.email),
        1
      );
      return;
    },
    addToPairs() {
      this.$refs["poster"].style.display = "none";
      let pairs = store.state.currentUser.pairs;
      pairs.push(this.data.email);
      db.collection("users")
        .doc(store.state.currentUser.email)
        .update({
          pairs
        });
    },
    showMore() {
      store.commit("setMoreData", this.data);
      store.commit("changeIsMore", true);
    }
  },
  watch: {
    isHolded() {
      if (!this.isHolded) {
        const poster = this.$refs["poster"];
        const color = this.$refs["color"];
        poster.style.transform = `translateX(0)`;
        color.style.background = `none`;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.poster-wrapper {
  background: white;
  height: 75%;
  width: inherit;
  display: block;
  border-radius: 8px;
  padding: 5px;
  box-sizing: border-box;
  max-width: 700px;
  width: 97%;
  margin: 20px 10px;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
  margin: auto;
}
.transitionIfNotHolded {
  transition: transform 0.5s;
  transform-origin: top;
}
.one-behind {
  transform-origin: top;
  transform: scale(0.9) translateY(-8px);
  opacity: 0.9;
  z-index: 1;
}
.two-behind {
  transform-origin: top;
  transform: scale(0.8) translateY(-16px);
  opacity: 0.7;
  z-index: 0;
}
.farther {
  visibility: hidden;
  transform: scale(0.7) translateY(-30px);
}

.color {
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  display: flex;
  margin: -5px;
  padding: 5px;
}
.left,
.right {
  width: 50%;
  height: 100%;
  display: block;
}
.active {
  border-top: 4px solid white;
}
.tekst {
  position: absolute;
  bottom: 30px;
  left: 20px;
  color: white;
  text-shadow: 0 0 5px rgb(78, 78, 78);
  h1 {
    margin: 0;
  }
}
.more {
  position: absolute;
  bottom: 30px;
  right: 10px;
  color: black;
  background: white;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}
</style>