<template>
  <div class="AboutContent">
    <p class="p1">Aplikacja została stworzona aby ułatwić wam poznawanie się w <u style="font-weight: 300">naszej</u> wspaniałej szkole. Enjoy ✌</p>
    <div class="how">
      <div class="how-flex">
        <h4>Jak do tego doszło?</h4>
        <img src="../../assets/about/how.gif" >
      </div>
      <p class="p-idk">Nie wiem.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutContent',
};
</script>

<style scoped lang='scss'>
.p1{
  font-size: 42px;
  font-weight: 200;
  padding: 0 10%;
  margin: 100px auto;
  text-align: center;
  @media (max-width: 500px){
    font-size: 36px;
  }
}
.how{
  margin: 150px 0 0;
  .how-flex{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    img{
      width:70%;
      border: 1px solid #707070;
      border-radius: 8px;
    }
    h4{
      font-size: 52px;
      color: #414141;
      text-align: right;
      margin: 0;
    }
    @media (max-width: 650px){
      display: flex;
      flex-direction: column;
      align-items: center;
      h4{
        text-align: center;
        font-size: 40px;
        margin: 10px 20px;
      }
      img{
        width: 95%;
      }
    }
  }
  .p-idk{
    text-align: center;
    font-size: 50px;
    margin: 85px auto 150px;
    font-weight: 200;
  }
}
</style>