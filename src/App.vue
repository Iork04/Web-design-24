<template>
  <rain></rain>
  <shadowCurtain></shadowCurtain>
  <Navigation></Navigation>
  <topContent></topContent>
  <updateBackground></updateBackground>
  <div class="test"></div>
</template>


<script>

import shadowCurtain from "./components/shadowCurtain.vue";
import Navigation from "./components/Navigation.vue";
import topContent from "./components/topContent.vue";
import rain from "./components/rain.vue";
import updateBackground from "./components/updateBackground.vue"

export default {
 
  data() {
    return {

    }
  }
  ,
  components: {
    shadowCurtain,
    Navigation,
    topContent,
    rain,
    updateBackground
  }
}

</script>

<style>
.test {
  position: relative;
  z-index: 99;
  height: 500vh;
  width: 100%;
  /* background-color: rgb(172, 148, 148); */
}
</style>