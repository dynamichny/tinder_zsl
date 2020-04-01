<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,700&display=swap');
body {
  margin: 0;
}
#app {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: white;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  padding: 3px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: linear-gradient(225deg, #dd4587, #ff8941);
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #dd4587, #ff8941);
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
}
::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
}
::-webkit-scrollbar-corner {
    background-color: transparent;
}
</style>
