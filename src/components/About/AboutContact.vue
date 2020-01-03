<template>
  <div class="contact">
    <div class="text">
      <h4>Kontakt</h4>
      <p>Jeżeli widzisz jakąś potencjalną zmiane, buga, masz pomysł na rozwój aplikacji lub po prostu chcesz nawiązać kontakt to po napisz do mnie wiadomość.</p>
    </div>
    <form>
      <input type="email" placeholder="Twój email" />
      <textarea placeholder="w czym moge Ci pomóc?"></textarea>
      <button type="submit">Wyślij</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AboutContact"
};
</script>

<style scoped lang='scss'>
.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding: 0 10%;
  margin: 0 0 150px;
  @media (max-width: 650px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 30px;
  }
}
.text {
  h4 {
    font-size: 52px;
    margin: 0;
  }
  p {
    font-size: 20px;
    width: 70%;
    margin: 20px 30px;
    @media (max-width: 650px){
      width: 95%;
      margin: 5px 20px;
    }
  }
}

form {
  padding: 80px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  input,
  textarea {
    width: 70%;
    margin: 0 auto 20px;
    padding: 10px;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 18px;
    outline: none;
    transition: all 0.2s;
    @media (max-width: 650px){
      width: 95%;
    }
    &::placeholder {
      color: #414141;
      font-weight: 600;
    }
  }
  input {
    border: none;
    border-bottom: 2px solid #e881ae;
    &:focus {
      border-color: #f88155;
    }
  }
  textarea {
    height: 200px;
    resize: none;
    &:focus {
      border-color: #707070;
    }
  }
  button {
    padding: 10px;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    color: white;
    background: linear-gradient(251deg, #DD4587AD 0%, #FF8941 100%);
    font-size: 24px;
    border: none;
    max-width: 200px;
    min-width: 100px;
    width: 60%;
  }
}
</style>