<template>
  <div>
    <svg viewBox="0 0 1922 1080.9" preserveAspectRatio="none" class="xd bg1">
      <defs>
        <linearGradient id="a" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#f68265" />
          <stop offset="1" stop-color="#e881ad" stop-opacity=".2" />
        </linearGradient>
      </defs>
      <path
        d="M-6 1165l1920 1 2-1081s-629 2-798 379-601 488-787 482-337 0-337 0z"
        transform="translate(6 -85)"
        fill="url(#a)"
      />
    </svg>

    <svg viewBox="0 0 1534.7 628.6" preserveAspectRatio="none" class="xd bg2">
      <defs>
        <linearGradient id="a" x1=".2" y1="0" x2=".6" y2="1.2" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#e881ae" />
          <stop offset="1" stop-color="#fff" />
        </linearGradient>
      </defs>
      <path d="M0 455c1140 19 1535 628 1535 628H0z" transform="translate(0 -455)" fill="url(#a)" />
    </svg>

    <svg viewBox="0 0 1920 108.5" preserveAspectRatio="none" id="bg-footer" class="xd bg3">
      <path class="uno" d="M0 110h1920V22S1372-38 917 40 0 40 0 40" fill="#fff" ref="path"/>
    </svg>
  </div>
</template>

<script>
import anime from "animejs";
export default {
  name: "AboutHeroBg",
  mounted() {
    const paths = [
      "M0 110h1920V22S1394 128 917 40 0 40 0 40",
      "M0 110h1920V22S1372-38 917 40 0 40 0 40"
    ];
    anime({
      targets: '.uno',
      duration: '10000',
      easing: 'easeInOutQuad',
      loop:true,
      d: [{ value: paths[0] }, { value: paths[1] }]
    });
  }
};
</script>

<style scoped lang='scss'>
.xd {
  width: 100vw;
  position: absolute;
  bottom: 0;
}
.bg1 {
  height: 90vh;
  z-index: 2;
  animation: xd1 5s infinite ease-in-out;
}
.bg2 {
  height: 65vh;
  z-index: 1;
  animation: xd1 5s 1s infinite ease-in-out;
}
.bg3 {
  z-index: 5;
  height: 5vh;
  bottom: -5px;
}
@media (max-width: 650px){
  .bg1{
    height: 50vh;
  }
  .bg2{
    height: 30vh;
  }
}
@keyframes xd1 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>