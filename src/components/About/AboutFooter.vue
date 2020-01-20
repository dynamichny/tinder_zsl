<template>
  <footer>
    <div class="links">
      <a href="https://github.com/dynamichny" target="_blank">
        <img src="../../assets/about/github.svg" alt="GitHub" />
      </a>
      <a href="https://www.linkedin.com/in/marcin-pawlicki-480959186/" target="_blank">
        <img src="../../assets/about/linkedin.svg" alt="Linked In" />
      </a>
    </div>
    <p class="clausure">© 2020 Marcin Pawlicki. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: "AboutFooter"
};
</script>

<style scoped lang='scss'>
footer {
  width: 100%;
  background: #414141;
  color: white;
  padding: 20px 0;
}
.links {
  display: flex;
  justify-content: space-around;
  width: 250px;
  margin: auto;
}
.clausure {
  text-align: center;
  font-size: 14px;
  margin: 20px 0 0;
}
</style>