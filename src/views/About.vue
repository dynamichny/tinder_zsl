<template>
  <div class="about">
    <Hero />
    <Content id="info"/>
    <Contact id="contact"/>
    <AboutFooter />
  </div>
</template>

<script>
import AboutHero from '@/components/About/AboutHero.vue';
import AboutContent from '@/components/About/AboutContent.vue';
import AboutContact from '@/components/About/AboutContact.vue';
import AboutFooter from '@/components/About/AboutFooter.vue';

export default {
  name: 'About',
  components: {
    Hero: AboutHero,
    Content: AboutContent,
    Contact: AboutContact,
    AboutFooter
  }
};
</script>

<style scoped lang='scss'>
.about{
  margin: 0;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #414141;
}
</style>