<template>
  <div class="poster-wrapper" ref="poster" @mousedown="handleMouseDown" @touchstart="handleMouseDown" @mouseup="handleMouseUp" @touchend="handleMouseUp" @mousemove="handleMove" @touchmove="handleMove">
    {{holdX}}
  </div>
</template>

<script>
export default {
  name: 'Poster',
  data(){
    return {
      isHolded: false,
      holdX: null,
    }
  },
  methods: {
    handleMouseDown(e){
      this.isHolded = true;
      if(e.type == 'touchstart') {
        this.holdX = Math.round(e.targetTouches[0].pageX);
      } else {
        this.holdX = Math.round(e.pageX);
      }
      this.$refs['poster'].style.transition = '';
    },
    handleMouseUp(){
      this.isHolded = false;
      this.$refs['poster'].style.transition = 'all .3s';
    },
    handleMove(e){
      if(this.isHolded){
        //e.targetTouches[0].pageX - this.holdX = różnica od miejsca naciścnięcia do miejsca przeniesienia
        let moveX;
        if(e.type == 'mousemove'){
          moveX = e.pageX - this.holdX;
        } else {
          moveX = e.targetTouches[0].pageX - this.holdX;
        }
        const poster = this.$refs['poster'];
        poster.style.transform = `translateX(${moveX * .85}px) rotate(${moveX * .05}deg)`;
        if(moveX < 0){
          poster.style.background = `hsla(0, 100%, 50%, ${-moveX * .004})`;
        } else {
          poster.style.background = `hsla(126, 100%, 50%, ${moveX * .004})`;
        }
      }
    },
  },
  watch: {
    isHolded(){
      if(!this.isHolded){
        const poster = this.$refs['poster']; 
        poster.style.transform = `translateX(0)`;
        poster.style.background = `gray`;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.poster-wrapper{
  background: gray;
  height: 85%;
  width: 100%;
  display: block;
  border-radius: 8px;
  padding: 5px;
  box-sizing: border-box;
  max-width: 700px;
  margin: auto;
}
</style>