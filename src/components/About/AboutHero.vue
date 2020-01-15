<template>
  <div class="hero">
    <nav>
      <a @click="scrollTo('#info')">Informacje</a>
      <a @click="scrollTo('#contact')">Kontakt</a>
    </nav>
    <div class="content">
      <div class="left-content" v-rellax="{speed: 3}">
        <div v-rellax="{speed: .5}">
          <img src="@/assets/logo_white.png" />
          <h1>tinder łączności</h1>
        </div>
        <button @click="$router.push({ path: '/app' })" v-rellax="{speed: .6}">Rozpocznij</button>
      </div>
      <div class="right-content" v-rellax="{speed: 2.5}">
        <img src="@/assets/about/phone.png" />
      </div>
    </div>
    <AboutHeroBg />
  </div>
</template>

<script>
import AboutHeroBg from './AboutHeroBg.vue';
export default {
  name: "AboutHero",
  components: {
    AboutHeroBg
  },
  methods: {
    scrollTo(id) {
      const offsetTop = document.querySelector(id).offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.hero {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

nav {
  padding: 3%;
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
  z-index: 100;
  a {
    color: #414141;
    text-decoration: none;
    font-size: 25px;
    margin: 0 50px;
    cursor: pointer;
    z-index: 100;
  }
  @media (max-width: 470px) {
    padding: 30px 0;
    justify-content: space-around;
    a {
      margin: 0 5px;
    }
  }
}

.content {
  z-index: 5;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.left-content {
  z-index: 10;
  position: relative;
  background: url("../../assets/about/hero_shape.svg") no-repeat center/100%;
  padding: 20px;
  width: 900px;
  height: 550px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  @media (max-width: 900px) {
    height: 100vh;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: url("../../assets/about/hero_shape.svg") no-repeat center/100%;
    div {
      img {
        height: 60px;
      }
      h1 {
        font-size: 50px;
        overflow-wrap: break-word;
      }
    }
  }
  @media (max-width: 650px) {
    background: url("../../assets/about/hero_shape.svg") no-repeat center/130%;
    text-align: center;
    div {
      flex-wrap: wrap;
      h1 {
        font-size: 36px;
      }
      img {
        filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.4));
      }
    }
  }
  @media (max-width: 400px) {
    background: url("../../assets/about/hero_shape.svg") no-repeat center/150%;
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  h1 {
    color: white;
    font-size: 64px;
    display: table;
  }
  button {
    border-radius: 50px;
    padding: 16px 100px;
    background: white;
    border: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    font-size: 24px;
    color: #707070;
    cursor: pointer;
    @media (max-width: 650px) {
      padding: 16px 60px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
    }
  }
}
.right-content {
  z-index: 10;
  margin: 0 10px;
  img {
    height: 600px;
  }
  @media (max-width: 900px) {
    display: none;
  }
}
</style>