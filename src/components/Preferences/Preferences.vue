<template>
  <div class="preferences">
    <h1>Ustaw preferencje</h1>
    <form @submit.prevent="setPreferences()">
      <p>Jakimi płciami jesteś zainteresowan{{ currentUser.plec == 'k' ? 'a' : 'y'}}?</p>
      <div class="checkboxes plci">
        <div>
          <input type="checkbox" id="womans" value="k" v-model="plcie">
          <label for="womans">Kobiety</label>
        </div>
        <div>
          <input type="checkbox" id="mans" value="m" v-model="plcie">
          <label for="mans">Mężczyźni</label>
        </div>
        <div>
          <input type="checkbox" id="inne" value="i" v-model="plcie">
          <label for="inne">Inne</label>
        </div>
      </div>
      
      <p>Jakimi klasami jesteś zainteresowan{{ currentUser.plec == 'k' ? 'a' : 'y'}}?</p>
      <div class="checkboxes klasy">
        <div>
          <input type="checkbox" id="1g" value="1g" v-model="klasy">
          <label for="1g">1 po gimnazjum</label>
        </div>
        <div>
          <input type="checkbox" id="1p" value="1p" v-model="klasy">
          <label for="1p">1 po podstawówce</label>
        </div>
        <div>
          <input type="checkbox" id="2" value="2" v-model="klasy">
          <label for="2">2</label>
        </div>
        <div>
          <input type="checkbox" id="3" value="3" v-model="klasy">
          <label for="3">3</label>
        </div>
        <div>
          <input type="checkbox" id="4" value="4" v-model="klasy">
          <label for="4">4</label>
        </div>
      </div>
      <button type="submit">Zapisz</button>
    </form>
  </div>
</template>

<script>
import store from '@/store/index';
import db from "@/components/firebaseInit.js";

export default {
  id: 'Preferences',
  data(){
    return {
      plcie: [],
      klasy: [],
    }
  },
  computed: {
    currentUser(){
      return store.state.currentUser;
    }
  },
  methods: {
    setPreferences(){
      if(this.plcie.length && this.klasy.length){
        db.collection('users').doc(this.currentUser.email).update({
          preferences: {
            plcie: this.plcie,
            klasy: this.klasy,
            isSet: true,
          }
        })
      } else {
        alert('Musisz zaznaczyc co najmniej jedną płeć i jedną klase.')
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.preferences{
  box-sizing: border-box;
  padding: 10px;
  max-width: 700px;
  margin: auto;
  z-index: 1000;
}
h1{
  margin: 0;
}
form{
  display: flex;
  flex-direction: column;
}
.checkboxes{
  display: flex;
  flex-direction: column;
  font-size: 17px;
  div{
    margin: 5px 0;
  }
}
p{
  margin: 30px 0 10px 0;
  font-size: 18px;
}

button{
  background: linear-gradient(225deg, #DD4587, #FF8941);
  font-family: 'Montserrat';
  color: white;
  border: none;
  padding: 10px;
  margin: 30px 0 0;
  border-radius: 5px;
  font-size: 18px;
  outline: none;
}
</style>